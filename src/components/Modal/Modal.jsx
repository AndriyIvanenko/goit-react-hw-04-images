import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscapePress);
    return () => {
      window.removeEventListener('keydown', onEscapePress);
    };
  });

  const onEscapePress = evt => {
    if (evt.code === 'Escape') {
      closeModal();
    }
  };

  const onBackdropClick = () => {
    closeModal();
  };

  return createPortal(
    <Backdrop onClick={onBackdropClick}>
      <ModalContainer>{children}</ModalContainer>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
};
