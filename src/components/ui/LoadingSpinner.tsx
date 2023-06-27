import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.loaderBox}>
      <span className={styles.loader} />
    </div>
  );
};

export default LoadingSpinner;
