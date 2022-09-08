export default class PhotosApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhotos() {
    const url =
    `https://pixabay.com/api/?q=${this.searchQuery}&image_type=photo&orientation=horizontal&min_height=430&page=${this.page}&per_page=12&key=29734383-6ec437d7a0c5df52cef54a0f9`;

    return fetch(url)
      .then(r => r.json())
      .then(({ hits }) => {
        this.page += 1;
        return hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.query;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}