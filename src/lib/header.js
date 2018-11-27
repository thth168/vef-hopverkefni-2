import { empty, createElement, newAttribute } from './helpers';

export default class Header {
  constructor(category, title, imagepath, parent) {
    this.container = document.querySelector('.header');
    if (parent) { this.container = parent; }
    this.category = category;
    this.title = title;
    this.imagepath = imagepath;
    this.parentClass = this.container.classList.value;
  }

  load() {
    empty(this.container);
    this.containerAttributes = [newAttribute('class', `${this.parentClass}__container`)];
    this.divElement = createElement('div', '', this.containerAttributes);
    this.categoryAttr = [newAttribute('class', `${this.parentClass}__category`)];
    this.categoryElement = createElement('p', this.category, this.categoryAttr);
    this.titleAttr = [newAttribute('class', `${this.parentClass}__title`)];
    this.titleElement = createElement('h1', this.title, this.titleAttr);
    if (this.imagepath) {
      this.imageAttr = [newAttribute('src', this.imagepath), newAttribute('class', `${this.parentClass}__image`)];
      this.imageElement = createElement('img', '', this.imageAttr);
      this.imageElement.addEventListener('error', e => this.imgError(e));
      this.container.appendChild(this.imageElement);
    }
    this.divElement.appendChild(this.categoryElement);
    this.divElement.appendChild(this.titleElement);
    this.container.appendChild(this.divElement);
  }

  imgError(event) {
    event.preventDefault();
    event.target.removeAttributeNode(event.target.getAttributeNode('src'));
    event.target.setAttributeNode(newAttribute('src', './img/header.jpg'));
  }
}
