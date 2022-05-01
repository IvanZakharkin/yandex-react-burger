import styles from './orders.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../../components/app-header/app-header';
import ProfileMenu from '../../components/profile-menu/profile-menu'

export default function OrdersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.menu}>
        <ProfileMenu></ProfileMenu>
      </div>
      <div className={styles.main}>
      </div>
    </div>
  );
}
