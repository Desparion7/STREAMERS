import { useNavigate } from 'react-router-dom';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import styles from './StreamersList.module.scss';
import {
  useGetStreamersQuery,
  useUpdateStreamerVoteMutation,
} from '../../app/slice/streamersApiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';

const StreamersList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetStreamersQuery();
  const [updateStreamer] = useUpdateStreamerVoteMutation();

  const updateVoteHandler = async (vote: number, streamerId: string) => {
    await updateStreamer({
      vote,
      streamerId,
    });
  };

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  }
  if (isError && 'data' in error) {
    content = <div className="errorText">{error.data.message}</div>;
  }
  if (isSuccess) {
    content = (
      <>
        {data.map((streamer) => (
          <div className={styles.streamersList__streamer} key={streamer._id}>
            <div className={styles['streamersList__streamer--details']}>
              <img src={streamer.imgUrl} alt={streamer.name} />
              <h3>{streamer.name}</h3>
            </div>
            <div className={styles['streamersList__streamer--votes']}>
              <div className={styles['streamersList__streamer--votes-btn']}>
                <p>
                  Upvotes:{' '}
                  <span className={styles.upvotes}>{streamer.upvote}</span>
                </p>
                <button
                  type="button"
                  className={styles.upvoteBtn}
                  onClick={() => {
                    updateVoteHandler(1, streamer._id);
                  }}
                >
                  <BiSolidLike />
                </button>
              </div>
              <div className={styles['streamersList__streamer--votes-btn']}>
                <p>
                  Downvotes:{' '}
                  <span className={styles.downvotes}>{streamer.downvote}</span>
                </p>
                <button
                  type="button"
                  className={styles.downvoteBtn}
                  onClick={() => {
                    updateVoteHandler(-1, streamer._id);
                  }}
                >
                  <BiSolidDislike />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="orangeButton"
              onClick={() => {
                navigate(`/streamer/${streamer._id}`);
              }}
            >
              View More
            </button>
          </div>
        ))}
      </>
    );
  }

  return <div className={`${styles.streamersList} containter`}>{content}</div>;
};

export default StreamersList;
