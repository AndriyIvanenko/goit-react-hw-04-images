import React from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/Button';
import { ImagesGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { ModalImg } from './App.styled';

const API_KEY = '29601825-65f79e377599d679ceb963779';
axios.defaults.baseURL = 'https://pixabay.com/api';

class App extends React.Component {
  state = {
    images: [],
    isLoadind: false,
    request: '',
    page: 1,
    showModal: false,
    modalImgId: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.request !== this.state.request ||
      prevState.page !== this.state.page
    ) {
      try {
        const response = await axios.get(
          `/?q=${this.state.request}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        // setTimeout(() => {
        this.setState({
          images: this.state.images.concat(response.data.hits),
          isLoadind: false,
        });
        // }, 500);
      } catch (e) {
        console.log(e);
      }
    }
  }

  getRequest = data => {
    if (data && data !== this.state.request) {
      this.setState({ request: data, isLoadind: true, page: 1, images: [] });
    }
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1, isLoadind: true });
  };

  toggleModal = data => {
    this.setState({ showModal: !this.state.showModal, modalImgId: data });
  };

  getModalImage = () => {
    return this.state.images.find(
      image => image.id.toString() === this.state.modalImgId
    );
  };

  render() {
    return (
      <div>
        <Searchbar onSearchSubmit={this.getRequest}></Searchbar>
        <ImagesGallery
          images={this.state.images}
          showModal={this.toggleModal}
        ></ImagesGallery>
        {this.state.isLoadind && <Loader></Loader>}
        {this.state.images.length > 0 && (
          <LoadMore loadMore={this.loadMore}></LoadMore>
        )}
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <ModalImg
              src={this.getModalImage().largeImageURL}
              alt={this.getModalImage().tags}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
