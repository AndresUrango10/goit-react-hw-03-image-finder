import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalOverlay } from './Modal.styled';


class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  };

  closeModal = () => {
    const { closeModal } = this.props;
    document.removeEventListener('keydown', this.handleKeyPress);
    closeModal();
  };

  render() {
    const { image } = this.props;

    return (
      <ModalOverlay onClick={this.closeModal}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <img src={image.largeImageURL} alt={image.alt} />
        </ModalContainer>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
