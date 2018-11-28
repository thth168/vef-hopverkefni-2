import {
  empty, errorDisplay, createElement, Attr,
} from './helpers';

/**
 * Hlutur sem smíðar listann á heimasíðunni
 * @param {*} UrlSearchParam
 */
export default class List {
  constructor(UrlSearchParam) {
    this.container = document.querySelector('.list');
    this.USP = new URLSearchParams(UrlSearchParam);
    this.slug = this.USP.get('slug');
  }

  /**
   * Function sem sér um að sækja gögnin fyrir heimasíðuna
   */

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

  /**
   * Function sem sér um að birta gögnin sem það tekur inn
   * @param {*} data
   */

  displayData(data) {
    this.data = data.reverse();
    while (this.data.length > 0) {
      this.container.appendChild(this.createCard(this.data.pop()));
    }
  }

  /**
   * Function sem sér um að búa til spjald fyrir hvern fyrirlestur
   * <div class='list__card data.category' slug='data.slug'>\
   * --<div class='card__image'>\
   * ----<img class='image__img' src='this.thumbnail' alt='Image for the lecture'>\
   * --</div>\
   * --<div class='card__text'>\
   * ----<div class='text__container'>\
   * ------<p class='text__category'>data.category</p>\
   * ------<h2 class='text__title'>data.title</h2>\
   * ----</div>\
   * ----<p class='text__finished'>✓</p>\
   * --</div>\
   * </div>
   * @param {*} data
   */

  createCard(data) {
    this.cardDiv = createElement('div', '', Attr('class', `list__card ${data.category}`), Attr('slug', data.slug));
    this.imgDiv = createElement('div', '', Attr('class', 'card__image'));
    this.containerDiv = createElement('div', '', Attr('class', 'card__text'));
    this.textDiv = createElement('div', '', Attr('class', 'text__container'));
    if (data.thumbnail) {
      this.thumbnail = data.thumbnail;
      this.imgDiv.appendChild(createElement('img', '', Attr('class', 'image__img'), Attr('src', `./${this.thumbnail}`), Attr('alt', 'Image for the lecture'), Attr('aria-labelledby', data.slug)));
    }
    this.cardDiv.appendChild(this.imgDiv);
    this.textDiv.appendChild(createElement('p', data.category, Attr('class', 'text__category')));
    this.textDiv.appendChild(createElement('h2', data.title, Attr('class', 'text__title'), Attr('id', data.slug)));
    this.containerDiv.appendChild(this.textDiv);

    if (window.localStorage.getItem(data.slug) === 'true') {
      this.containerDiv.appendChild(createElement('p', '✓', Attr('class', 'text__finished')));
    }
    this.cardDiv.appendChild(this.containerDiv);
    this.cardDiv.addEventListener('click', this.link);
    return this.cardDiv;
  }

  /**
   * Event handler sem sér um að búa til linka fyrir hvern fyrirlestur
   * @param {*} e
   */
  link(e) {
    this.slug = e.currentTarget.attributes.slug.value;
    this.currentUrl = new URL('./fyrirlestur.html', window.location.href);
    this.USParams = new URLSearchParams(this.currentUrl.search);
    this.USParams.set('slug', this.slug);
    this.currentUrl.search = this.USParams;
    window.location = this.currentUrl;
  }
}
