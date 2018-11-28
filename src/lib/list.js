import {
  empty, errorDisplay, createElement, Attr,
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
    this.cardDiv = createElement('div', '', Attr('class', 'list__card'), Attr('slug', data.slug));
    this.cardDiv.classList.add(this.category);
    this.imgDiv = createElement('div', '', Attr('class', 'card__image'));
    if (data.thumbnail) {
      this.thumbnail = data.thumbnail;
      this.imgDiv.appendChild(createElement('img', '', Attr('class', 'image__img'), Attr('src', `./${this.thumbnail}`), Attr('alt', 'Image for the lecture')));
    }
    this.cardDiv.appendChild(this.imgDiv);

    this.containerDiv = createElement('div', '', Attr('class', 'card__text'));
    this.textDiv = createElement('div', '', Attr('class', 'text__container'));
    this.textDiv.appendChild(createElement('p', this.category, Attr('class', 'text__category')));
    this.textDiv.appendChild(createElement('h2', this.title, Attr('class', 'text__title')));
    this.containerDiv.appendChild(this.textDiv);

    if (window.localStorage.getItem(data.slug) === 'true') {
      this.containerDiv.appendChild(createElement('p', '✓', Attr('class', 'text__finished')));
    }
    this.cardDiv.appendChild(this.containerDiv);
    this.cardDiv.addEventListener('click', this.link);
    return this.cardDiv;
  }

  link(e) {
    this.slug = e.currentTarget.attributes.slug.value;
    this.currentUrl = new URL('./fyrirlestur.html', window.location.href);
    this.USParams = new URLSearchParams(this.currentUrl.search);
    this.USParams.set('slug', this.slug);
    this.currentUrl.search = this.USParams;
    window.location = this.currentUrl;
  }
}
