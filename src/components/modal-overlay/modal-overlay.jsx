import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
  return <div className={styles['modal-overlay']} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalOverlay;
