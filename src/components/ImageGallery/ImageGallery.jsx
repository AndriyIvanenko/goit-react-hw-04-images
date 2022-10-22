import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImagesGallery = ({ images, showModal }) => {
  function onImageClick(evt) {
    if (evt.target.classList.contains('img')) {
      showModal(evt.target.id);
    }
  }

  return (
    <Gallery onClick={onImageClick}>
      {images.map(image => (
        <GalleryItem key={image.id} image={image}></GalleryItem>
      ))}
    </Gallery>
  );
};

ImagesGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  showModal: PropTypes.func,
};
