import { empty, createElement, Attr } from './helpers';

/**
 * Hlutur sem sér um að smíða header á síðunni
 *
 * @param {category} String category
 * @param {title} String title
 * @param {imagepath} String imagepath
 * @param {parent} Object parent
 */

export default class Header {
  constructor(category, title, imagepath, parent) {
    this.container = document.querySelector('.header');
    if (parent) { this.container = parent; }
    this.category = category;
    this.title = title;
    this.imagepath = imagepath;
    this.parentClass = this.container.classList.value;
  }

  /**
   * Function sem sér um að hlaða inn hlutunum
   */

  load() {
    empty(this.container);
    this.divElement = createElement('div', '', Attr('class', `${this.parentClass}__container`));
    this.categoryElement = createElement('p', this.category, Attr('class', `${this.parentClass}__category`));
    this.titleElement = createElement('h1', this.title, Attr('class', `${this.parentClass}__title`));
    this.protector = createElement('div', '', Attr('class', `${this.parentClass}__protector`));
    if (this.imagepath) {
      this.imageElement = createElement('img', '', Attr('class', `${this.parentClass}__image`), Attr('src', this.imagepath), Attr('alt', 'Banner Image'));
      this.imageElement.addEventListener('error', e => this.imgError(e));
      this.container.appendChild(this.imageElement);
    }
    this.container.appendChild(this.protector);
    this.divElement.appendChild(this.categoryElement);
    this.divElement.appendChild(this.titleElement);
    this.container.appendChild(this.divElement);
  }

  imgError(event) {
    event.preventDefault();
    event.target.removeAttributeNode(event.target.getAttributeNode('src'));
    event.target.setAttributeNode(Attr('src', './img/header.jpg'));
  }
}
