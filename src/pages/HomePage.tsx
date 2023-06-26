import styles from './HomePage.module.scss';
import StreamerAddForm from '../components/homePage/StreamerAddForm';
import StreamersList from '../components/homePage/StreamersList';

const Homepage = () => {
  return (
    <div className={`${styles.homePage}`}>
      <StreamerAddForm />
      <StreamersList />
    </div>
  );
};

export default Homepage;
