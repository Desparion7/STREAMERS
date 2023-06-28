import { io } from 'socket.io-client';
import apiSlice from '../api/apiSlice';
import { Streamer } from '../../interface/streamers-interface';
import { FormValuesPhoto } from '../../interface/form-interface';

const socket = io('http://localhost:3000');

const streamersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStreamers: builder.query<Streamer[], void>({
      query: () => ({
        url: '/streamers',
        method: 'GET',
      }),
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a socket connection when the cache subscription starts
        socket.connect();
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          socket.on('streamers', (data) => {
            updateCachedData((draft) => {
              draft.push(data);
            });
          });
          socket.on('vote', (data) => {
            updateCachedData((draft) => {
              const index = draft.findIndex(
                (streamer) => streamer._id === data._id
              );
              if (index !== -1) {
                draft[index] = data;
              }
            });
          });
          // eslint-disable-next-line no-empty
        } catch {}
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        socket.disconnect();
      },

      providesTags: [{ type: 'Streamers', id: 'LIST' }],
    }),
    getStreamerbyId: builder.query<Streamer, { streamerId: string }>({
      query: ({ streamerId }) => ({
        url: `/streamers/${streamerId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Streamer', id: 'LIST' }],
    }),
    addStreamer: builder.mutation<Streamer, FormValuesPhoto>({
      query: ({ name, description, platform, photo }) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('platform', platform);
        formData.append('photo', photo);
        return {
          url: '/streamers',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'Streamers', id: 'LIST' }],
    }),
    updateStreamerVote: builder.mutation<
      Streamer,
      { streamerId: string; vote: number }
    >({
      query: ({ streamerId, vote }) => ({
        url: `/streamers/${streamerId}`,
        method: 'PUT',
        body: {
          vote,
        },
      }),
      invalidatesTags: [{ type: 'Streamers', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetStreamersQuery,
  useGetStreamerbyIdQuery,
  useAddStreamerMutation,
  useUpdateStreamerVoteMutation,
} = streamersApiSlice;
