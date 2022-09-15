import { Loading } from 'notiflix/build/notiflix-loading-aio';

const galleryEl = document.querySelector('.gallery');
const bodyEl = document.body;
const modalEl = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('.lightbox__button');
const imageEl = document.querySelector('.lightbox__image');

galleryEl.addEventListener('click', openModalOnClick);
closeModalBtn.addEventListener('click', closeModalOnClick);

function openModalOnClick(e) {
  if (!e.target.classList.contains('photo-card-img')) {
    return;
  }
  Loading.circle();
  modalEl.classList.add('is-open');
  bodyEl.classList.add('is-hidden');
  importOriginalImage(e)
  e.preventDefault();
  Loading.remove();
};

function closeModalOnClick(event) {
  if (!event.target.classList.contains('lightbox__button')) {
    return;
  }
  modalEl.classList.remove('is-open');
  bodyEl.classList.remove('is-hidden');
  clearSourceOnClose();
}

function importOriginalImage(e) {
  const newImage = e.target;
  imageEl.setAttribute('src', newImage.dataset.source);
  imageEl.setAttribute('alt', newImage.alt)
}

function clearSourceOnClose() {
  imageEl.setAttribute('src', '');
  imageEl.setAttribute('alt', '');
}