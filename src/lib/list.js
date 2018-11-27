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
    this.divAttr = [newAttribute('slug', data.slug), newAttribute('class', 'list__card')];
    this.cardDiv = createElement('div', '', this.divAttr);
    this.imgDivAttr = [newAttribute('class', 'card__image')];
    this.cardDiv.classList.add(this.category);
    this.imgDiv = createElement('div', '', this.imgDivAttr);
    if (data.thumbnail) {
      this.thumbnail = data.thumbnail;
      this.imgAttr = [newAttribute('src', `./${this.thumbnail}`), newAttribute('class', 'image__img')];
      this.imgDiv.appendChild(createElement('img', '', this.imgAttr));
    }
    this.cardDiv.appendChild(this.imgDiv);

    this.containerDivAttr = [newAttribute('class', 'card__text')];
    this.textDivAttr = [newAttribute('class', 'text__container')];
    this.titleAttr = [newAttribute('class', 'text__title')];
    this.categoryAttr = [newAttribute('class', 'text__category')];

    this.containerDiv = createElement('div', '', this.containerDivAttr);
    this.textDiv = createElement('div', '', this.textDivAttr);
    this.textDiv.appendChild(createElement('p', this.category, this.categoryAttr));
    this.textDiv.appendChild(createElement('h2', this.title, this.titleAttr));
    this.containerDiv.appendChild(this.textDiv);

    if (window.localStorage.getItem(data.slug) === 'true') {
      this.finishAttr = [newAttribute('class', 'text__finished')];
      this.containerDiv.appendChild(createElement('p', '✓', this.finishAttr));
    }
    this.cardDiv.appendChild(this.containerDiv);
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
