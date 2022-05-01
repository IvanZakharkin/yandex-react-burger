import React from "react";
import { NavLink, Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import styles from './app-header.module.css';


const AppHeader = () => {
  const liStyle = cn('text', 'text_type_main-default', styles['menu-item']);
  const liStyleActive = cn('text', 'text_type_main-default', styles['menu-item']);
  const linkStyle = cn('pt-4', 'pb-4', 'pl-5', 'pr-5', styles.link);
  const linkStyleActive = cn('pt-4', 'pb-4', 'pl-5', 'pr-5', styles.link, styles['link-active']);

  return (
    <header className={styles.header}>
      <nav className={cn('pt-4', 'pb-4', styles.container)}>
        <ul className={styles.menu}>
          <li className={liStyleActive}>
            <NavLink
              exact
              to='/'
              className={linkStyle}
              activeClassName={linkStyleActive}
            >
              <span className={styles['link-icon']}><BurgerIcon type="secondary" /></span>
              <span className={styles.buttonText}>Конструктор</span>
            </NavLink>
          </li>
          <li className={liStyle}>
            <NavLink
              to='/orders'
              className={linkStyle}
              activeClassName={linkStyleActive}
            >
              <span className={styles['link-icon']}><ListIcon type="secondary" /></span>
              <span className={styles.buttonText}>Лента заказов</span>
            </NavLink>
          </li>
          <li className={styles['menu-item-logo']}>
            <Link className={styles.logo} to={{ pathname: `/` }}>
              <Logo />
            </Link>
          </li>
          <li className={liStyle}>
            <NavLink
              to='/profile'
              className={linkStyle}
              activeClassName={linkStyleActive}
            >
              <span className={styles['link-icon']}><ProfileIcon type="secondary" /></span>
              <span className={styles.buttonText}>Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader; 
