import photoCardTpl from '../templates/photoCard.hbs';
import PhotosApiService from './apiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-button');
const toggleEl = document.querySelector('.toggle-checkbox');


formEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);


const photosApiService = new PhotosApiService();

function onSearch(event) {
  event.preventDefault();

  clearPhotoesContainer();
  photosApiService.query = event.currentTarget.elements.query.value;
  photosApiService.resetPage();

  photosApiService.fetchPhotos().then(responce => {
    if (responce.length === 0) {
      Notify.failure('We did not find anything');
      return;
    }
    renderPhotosGallery(responce);
    photosApiService.fetchTotal().then(r =>
      Notify.success(`We found ${r} images`));
  });
}

function onLoadMore() {
  photosApiService.fetchPhotos().then(responce => renderPhotosGallery(responce));
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

/* Change theme */

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
