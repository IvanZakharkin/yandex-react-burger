import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

const Modal = (props) => {
  const { children, title, onClose } = props;

  const onEscape = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('keydown', onEscape);
    };
  });

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={cn('p-10', styles.modal)}>
        <div className={styles.header}>
          <div className={cn('text', 'text_type_main-large', styles.title)}>
            {title}
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className="content">{children}</div>
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default Modal;
