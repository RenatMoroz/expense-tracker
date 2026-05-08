import css from './Header.module.css';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderAuth from './HeaderAuth/HeaderAuth';

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <HeaderLogo />
        <HeaderAuth />
      </div>
    </header>
  );
};

export default Header;
