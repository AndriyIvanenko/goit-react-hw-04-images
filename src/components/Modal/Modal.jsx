import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapePress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapePress);
  }

  onEscapePress = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBackdropClick = () => {
    this.props.closeModal();
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.onBackdropClick}>
        <ModalContainer>{this.props.children}</ModalContainer>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
};

export default Modal;
