import photoCardTpl from '../templates/photoCard.hbs';
import PhotosApiService from './apiService';


const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-button');
const toggleEl = document.querySelector('.toggle-checkbox');


formEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
toggleEl.addEventListener('click', changeThemeOnClick);


function changeThemeOnClick() {
  if (galleryEl.classList.contains('dark')) {
    galleryEl.classList.remove('dark');
    galleryEl.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    galleryEl.classList.remove('light');
    galleryEl.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}


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
}

function renderPhotosGallery(photo) {
  const markup = photoCardTpl(photo);
  galleryEl.classList.add('light');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  loadMoreBtn.classList.add('is-visible');
}

function clearPhotoesContainer() {
  galleryEl.innerHTML = '';
}

