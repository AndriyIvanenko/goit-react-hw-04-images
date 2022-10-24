import { useState, useEffect } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/Button';
import { ImagesGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { ModalImg } from './App.styled';

const API_KEY = '29601825-65f79e377599d679ceb963779';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const queryParams = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImgId, setModalImgId] = useState('');

  useEffect(() => {
    if (request !== '') {
      axios
        .get(`?q=${request}&page=${page}`, { params: { ...queryParams } })
        .then(response => {
          setImages(prevImages => prevImages.concat(response.data.hits));
          setIsLoading(false);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [request, page]);

  const getRequest = data => {
    if (data && data !== request) {
      setRequest(data);
      setIsLoading(true);
      setPage(1);
      setImages([]);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };

  const toggleModal = data => {
    setShowModal(prevState => !prevState);
    setModalImgId(data);
  };

  const getModalImage = () => {
    return images.find(image => image.id.toString() === modalImgId);
  };

  return (
    <div>
      <Searchbar onSearchSubmit={getRequest}></Searchbar>
      <ImagesGallery images={images} showModal={toggleModal}></ImagesGallery>
      {isLoading && <Loader></Loader>}
      {images.length > 0 && <LoadMore loadMore={loadMore}></LoadMore>}
      {showModal && (
        <Modal closeModal={toggleModal}>
          <ModalImg
            src={getModalImage().largeImageURL}
            alt={getModalImage().tags}
          />
        </Modal>
      )}
    </div>
  );
}
