import '../css/styles.css';
import photoCardTpl from '../templates/photoCard.hbs';
import PhotosApiService from './apiService';


const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-button');


formEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

const photosApiService = new PhotosApiService();

function onSearch(event) {
  event.preventDefault();

  clearPhotoesContainer();
  photosApiService.query = event.currentTarget.elements.query.value;
  photosApiService.resetPage();
  photosApiService.fetchPhotos().then(renderPhotosGallery);
}

function onLoadMore() {
  photosApiService.fetchPhotos().then(renderPhotosGallery);
  loadMoreBtn.scrollIntoView({block: "end", behavior: "smooth"});
}

function renderPhotosGallery(photo) {
  const markup = photoCardTpl(photo);
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function clearPhotoesContainer() {
  galleryEl.innerHTML = '';
}