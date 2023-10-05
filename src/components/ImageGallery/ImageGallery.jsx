import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Ulgallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, openModal } = this.props;
    return (
      <Ulgallery>
        {images.map((image) => (
          <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
        ))}
      </Ulgallery>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
