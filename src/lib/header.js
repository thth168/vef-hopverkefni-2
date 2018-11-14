import { empty, createElement, newAttribute } from './helpers';

export default class Header {
  constructor(category, title, imagepath, parent) {
    this.container = document.querySelector('.lecturepage-header');
    if (parent) { this.container = parent; }
    this.category = category;
    this.title = title;
    this.imagepath = imagepath;
    this.parentClass = this.container.classList.value;
  }

  load() {
    empty(this.container);
    this.categoryAttr = [newAttribute('class', `${this.parentClass}-category`)];
    this.categoryElement = createElement('p', this.category, this.categoryAttr);
    this.titleAttr = [newAttribute('class', `${this.parentClass}-title`)];
    this.titleElement = createElement('h1', this.title, this.titleAttr);
    this.imageAttr = [newAttribute('src', this.imagepath), newAttribute('class', `${this.parentClass}-image`)];
    this.imageElement = createElement('img', '', this.imageAttr);

    this.container.appendChild(this.categoryElement);
    this.container.appendChild(this.titleElement);
    this.container.appendChild(this.imageElement);
  }
}
