import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';

const Header = (props: any) => {

  return <header className={s.header}>
    <img src="https://www.freelogodesign.org/Content/img/logo-ex-7.png"/>
    <div className={s.login_block}>
      {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}

    </div>
  </header>
}

export default Header;
