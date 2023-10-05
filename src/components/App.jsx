import React, { Component } from 'react';
import { StyledApp } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const API_KEY = '38875510-9dc96174f5eca5b10cef5bab1';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    selectedImage: null,
    loadMore: true,
    totalImages: 0,
    notificationShown: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { query, page, notificationShown } = this.state;
    if (!query) return;

    try {
      this.setState({ loading: true });

      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const data = response.data;
      const totalHits = data.totalHits || 0;

      if (totalHits === 0) {
        toast.error('No se encontraron imágenes', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else if (!notificationShown) {
        toast.success(`Total de imágenes encontradas: ${totalHits}`, {
          position: 'top-right',
          autoClose: 3000,
        });

        this.setState({
          notificationShown: true,
          totalImages: totalHits,
        });
      }

      this.setState((prev) => ({
        images: page === 1 ? data.hits : [...prev.images, ...data.hits],
        loadMore: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchSubmit = (value) => {
    this.setState({ query: value, page: 1, images: [], loadMore: true, notificationShown: false });
  };

  loadMoreImages = () => {
    const { totalImages, page } = this.state;
    const remainingImages = totalImages - page * 12;
    toast.success(`Quedan ${remainingImages} imágenes de las ${totalImages} originales.`, {
      position: 'top-right',
      autoClose: 3000,
    });

    this.setState((prev) => ({ page: prev.page + 1 }));
  };

  openModal = (image) => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, loading, selectedImage, loadMore } = this.state;

    return (
      <StyledApp>
        <Toaster position="top-center" reverseOrder={false} />
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {loading && <Loader />}
        {loadMore && images.length > 0 && !loading && (
          <Button onClick={this.loadMoreImages} />
        )}
        {selectedImage && (
          <Modal image={selectedImage} closeModal={this.closeModal} />
        )}
      </StyledApp>
    );
  }
}

export default App;
