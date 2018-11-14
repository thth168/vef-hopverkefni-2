import {
  empty, errorDisplay, createElement, newAttribute,
} from './helpers';

export default class List {
  constructor(UrlSearchParam) {
    this.container = document.querySelector('.list');
    this.USP = new URLSearchParams(UrlSearchParam);
    this.slug = this.USP.get('slug');
  }

  load() {
    empty(this.container);
    fetch('./lectures.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Villa kom upp við að sækja síðu!!!');
      })
      .then((data) => {
        this.displayData(data.lectures);
      })
      .catch((error) => {
        errorDisplay(error);
      });
  }

  displayData(data) {
    this.data = data.reverse();
    while (this.data.length > 0) {
      this.container.appendChild(this.createCard(this.data.pop()));
    }
  }

  createCard(data) {
    this.category = data.category;
    this.title = data.title;
    this.divAttr = [newAttribute('slug', data.slug), newAttribute('class', 'list-card')];
    this.cardDiv = createElement('div', '', this.divAttr);
    if (data.thumbnail) {
      this.thumbnail = data.thumbnail;
      this.imgAttr = [newAttribute('src', `./${this.thumbnail}`), newAttribute('class', 'list-card-image')];
      this.cardDiv.appendChild(createElement('img', '', this.imgAttr));
    }
    this.textDivAttr = [newAttribute('class', 'list-card-text')];
    this.textDivElement = createElement('div', '', this.textDivAttr);
    this.categoryAttr = [newAttribute('class', 'list-card-text-category')];
    this.textDivElement.appendChild(createElement('p', this.category, this.categoryAttr));
    this.titleAttr = [newAttribute('class', 'list-card-text-title')];
    this.textDivElement.appendChild(createElement('h2', this.title, this.titleAttr));
    this.cardDiv.appendChild(this.textDivElement);
    if (window.localStorage.getItem(data.slug) === 'true') {
      this.finishAttr = [newAttribute('class', 'list-card-text-finished')];
      this.cardDiv.appendChild(createElement('p', '✓', this.finishAttr));
    }
    this.cardDiv.addEventListener('click', this.link);
    return this.cardDiv;
  }

  link(e) {
    this.slug = e.currentTarget.attributes.slug.value;
    this.currentUrl = new URL('/fyrirlestur.html', window.location);
    this.USParams = new URLSearchParams(this.currentUrl.search);
    this.USParams.set('slug', this.slug);
    this.currentUrl.search = this.USParams;
    window.location = this.currentUrl;
  }
}
