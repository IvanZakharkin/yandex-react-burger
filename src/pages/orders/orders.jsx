import styles from './orders.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';

export default function OrdersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.menu}>
        <ProfileMenu></ProfileMenu>
      </div>
      <div className={styles.main}></div>
    </div>
  );
}
