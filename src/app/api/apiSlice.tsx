import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

interface CustomError {
  data: {
    message: string;
  };
}

const apiUrl = 'http://localhost:3000';

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  credentials: 'include',
}) as BaseQueryFn<string | FetchArgs, unknown, CustomError>;
const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Streamers', 'Streamer'],
  endpoints: () => ({}),
});
export default apiSlice;
