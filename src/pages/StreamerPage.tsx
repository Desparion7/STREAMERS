import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import styles from './StreamerPage.module.scss';
import { useGetStreamerbyIdQuery } from '../app/slice/streamersApiSlice';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const StreamerPage = () => {
  const navigate = useNavigate();
  const { streamerId } = useParams();

  const { data, isSuccess, isLoading, isError, error } =
    useGetStreamerbyIdQuery({
      streamerId: streamerId as string,
    });
  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  }
  if (isError && 'data' in error) {
    content = <div className="errorText">{error.data.message}</div>;
  }
  if (isSuccess) {
    content = (
      <div className={styles.streamerPage__main}>
        <div className={styles['streamerPage__main--left']}>
          <img src={data.imgUrl} alt={data.name} />
        </div>
        <div className={styles['streamerPage__main--right']}>
          <div>
            <h2 className="gradient__text">{data.name}</h2>
            <p>{data.description}</p>
          </div>
          <div className={styles['streamerPage__main--right-btn']}>
            Main platform:
            {data.platform === 'youtube' && (
              <img src="/youtube.PNG" alt="twitch" />
            )}
            {data.platform === 'twitch' && (
              <img src="/twitch.PNG" alt="twitch" />
            )}
            <button
              type="button"
              onClick={() => {
                navigate('/');
              }}
            >
              <IoIosArrowRoundBack />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div className={`${styles.streamerPage} containter`}>{content}</div>;
};

export default StreamerPage;
