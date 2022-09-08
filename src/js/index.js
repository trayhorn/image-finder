import '../css/styles.css';
import photoCardTmpl from '../templates/photoCard.hbs';
import PhotosApiService from './apiService';

const photosApiService = new PhotosApiService();

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.button');

formEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

let input = '';

function onSearch(event) {
  event.preventDefault();

  photosApiService.query = event.currentTarget.elements.query.value;

  photosApiService.fetchPhotos()

  formEl.reset();
}

function renderPhotoGallery(photo) {
  const markup = photoCardTmpl(photo);
  galleryEl.innerHTML = markup;
}

function onLoadMore() {
  photosApiService.fetchPhotos();
}