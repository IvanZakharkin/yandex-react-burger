import { useSelector } from 'react-redux';
import { Redirect, Route, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './profile-menu.module.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/actions/auth';

export default function ProfileMenu() {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  }

  return (
    <ul className={styles.menu}>
      <li className={styles.item}>
        <NavLink 
          exact 
          className={cn('text', styles.link)} 
          to={{ pathname: `/profile` }}
          activeClassName={styles.active}
        >Профиль</NavLink>
      </li>
      <li className={styles.item}>
        <NavLink 
          exact 
          className={cn('text', styles.link)} 
          to={{ pathname: `/profile/orders` }}
          activeClassName={styles.active}
        >История заказов</NavLink>
      </li>
      <li className={styles.item}>
        <a className={cn('text', styles.link, styles.logout)} onClick={onLogout}>Выход</a>
      </li>
    </ul>
  );
}