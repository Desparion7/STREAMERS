import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={`${styles.header} containter`}>
      <h1 className="gradient__text">Dare Drop Streamers Spotlight</h1>
    </header>
  );
};

export default Header;
