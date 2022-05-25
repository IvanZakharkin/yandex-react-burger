import styles from './modal-overlay.module.css';

type TModalOverlay = {
  onClose: () => void,
}

const ModalOverlay = ({ onClose }: TModalOverlay) => {
  return <div className={styles['modal-overlay']} onClick={onClose}></div>;
};

export default ModalOverlay;
