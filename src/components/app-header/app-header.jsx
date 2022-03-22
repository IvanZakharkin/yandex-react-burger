import React from "react";
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import styles from './app-header.module.css';

class AppHeader extends React.Component {
  render() {
    console.log(styles.button);
    const liStyle = cn('text', 'text_type_main-default', 'text_color_inactive', styles['menu-item']);
    const liStyleActive =  cn('text', 'text_type_main-default', styles['menu-item']);
    const linkStyle = cn('pt-4', 'pb-4', 'pl-5', 'pr-5', styles.link);

    return (
      <header className={styles.header}>
        <nav className={cn('pt-4', 'pb-4', styles.container)}>
          <ul className={styles.menu}>
            <li className={liStyleActive}>
              <a className={linkStyle} href="/">
                <span className={styles['link-icon']}><BurgerIcon type="primary" /></span>
                <span className={styles.buttonText}>Конструктор</span>
              </a>
            </li>
            <li className={liStyle}>
              <a className={linkStyle} href="/order-feed/">
                <span className={styles['link-icon']}><ListIcon type="secondary" /></span>
                <span className={styles.buttonText}>Конструктор</span>
              </a>
            </li>
            <li className={styles['menu-item-logo']}>
              <a className={styles.logo} href="/">
                <Logo />
              </a>
            </li>
            <li className={liStyle}>
              <a className={linkStyle} href="/profile/">
                <span className={styles['link-icon']}><ProfileIcon type="secondary" /></span>
                <span className={styles.buttonText}>Конструктор</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default AppHeader; 