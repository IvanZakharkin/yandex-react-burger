import styles from './history-orders.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';

export default function ProfilePage() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.sidebar}>
          <div className="mb-20">
            <ProfileMenu></ProfileMenu>
          </div>
          <div className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </div>
        <div className={styles.main}></div>
      </div>
    </>
  );
}
