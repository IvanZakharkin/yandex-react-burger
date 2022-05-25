import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals') as HTMLElement;

type TModalProps = {
  title?: string;
  onClose: () => void
};

const Modal:FC<TModalProps> = (props) => {
  const { children, title, onClose } = props;

  const onEscape = (e:KeyboardEvent) => {
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

export default Modal;
