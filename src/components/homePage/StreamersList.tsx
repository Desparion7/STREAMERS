import { useNavigate } from 'react-router-dom';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import styles from './StreamersList.module.scss';

const StreamersList = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.streamersList} containter`}>
      <div className={styles.streamersList__streamer}>
        <div className={styles['streamersList__streamer--details']}>
          <img src="./asmongold.png" alt="streamer" />
          <h3>Asmongold</h3>
        </div>
        <div className={styles['streamersList__streamer--votes']}>
          <p>
            Upvotes: <span className={styles.upvotes}>1000</span>
          </p>
          <p>
            Downvotes: <span className={styles.downvotes}>24</span>
          </p>
          <button type="button" className={styles.upvoteBtn}>
            <BiSolidLike />
          </button>
          <button type="button" className={styles.downvoteBtn}>
            <BiSolidDislike />
          </button>
        </div>
        <button
          type="button"
          className="orangeButton"
          onClick={() => {
            navigate('/streamer/1');
          }}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default StreamersList;
