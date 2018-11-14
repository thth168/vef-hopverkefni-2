import { empty, createElement, newAttribute } from './helpers';

export default class Content {
  constructor(contentArray) {
    this.container = document.querySelector('.lecturepage-content');
    this.content = contentArray.reverse();
  }

  youtube(object) {
    this.data = object.data;
    this.dataAttr = [newAttribute('src', this.data), newAttribute('class', 'lecturepage-content-youtube')];
    this.youtubeElement = createElement('iframe', '', this.dataAttr);

    this.container.appendChild(this.youtubeElement);
  }

  text(object) {
    this.divAttr = [newAttribute('class', 'lecturepage-content-text')];
    this.textDiv = createElement('div', '', this.divAttr);
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.pAttr = [newAttribute('class', 'lecturepage-content-text-paragraph')];
      this.textDiv.appendChild(createElement('p', this.data.pop(), this.pAttr));
    }
    this.container.appendChild(this.textDiv);
  }

  quote(object) {
    this.divAttr = [newAttribute('class', 'lecturepage-content-quote')];
    this.blockquote = createElement('blockquote', '', this.divAttr);
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.pAttr = [newAttribute('class', 'lecturepage-content-quote-paragraph')];
      this.blockquote.appendChild(createElement('p', this.data.pop(), this.pAttr));
    }
    this.footerAttr = [newAttribute('class', 'lecturepage-content-quote-source')];
    this.blockquote.appendChild(createElement('footer', object.attribute, this.footerAttr));
    this.container.appendChild(this.blockquote);
  }

  image(object) {
    this.figAttr = [newAttribute('class', 'lecturepage-content-imageContainer')];
    this.figure = createElement('figure', '', this.figAttr);
    this.imageAttr = [newAttribute('src', object.data), newAttribute('class', 'lecturepage-content-imagecontainer-image')];
    this.figure.appendChild(createElement('img', '', this.imageAttr));
    this.captionAttr = [newAttribute('class', 'lecturepage-content-imageContainer-caption')];
    this.figure.appendChild(createElement('caption', object.caption, this.captionAttr));
    this.container.appendChild(this.figure);
  }

  heading(object) {
    this.headingAttr = [newAttribute('class', 'lecturepage-content-heading')];
    this.container.appendChild(createElement('h1', object.data, this.headingAttr));
  }

  list(object) {
    this.listAttr = [newAttribute('class', 'lecturepage-content-list')];
    this.listElement = createElement('ul', '', this.listAttr);
    this.data = object.data;
    while (this.data.length > 0) {
      this.dataAttr = [newAttribute('class', 'lecturepage-content-list-listitem')];
      this.listElement.appendChild(createElement('li', this.data.pop(), this.dataAttr));
    }
    this.container.appendChild(this.listElement);
  }

  code(object) {
    this.divAttr = [newAttribute('class', 'lecturepage-content-code')];
    this.codeDiv = createElement('pre', '', this.divAttr);
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.pAttr = [newAttribute('class', 'lecturepage-content-code-line')];
      this.codeDiv.appendChild(createElement('code', this.data.pop(), this.pAttr));
      this.codeDiv.appendChild(createElement('br'));
    }
    this.container.appendChild(this.codeDiv);
  }

  load() {
    empty(this.container);
    while (this.content.length > 0) {
      this.object = this.content.pop();
      switch (this.object.type) {
        case 'youtube':
          this.youtube(this.object);
          break;
        case 'text':
          this.text(this.object);
          break;
        case 'quote':
          this.quote(this.object);
          break;
        case 'image':
          this.image(this.object);
          break;
        case 'heading':
          this.heading(this.object);
          break;
        case 'list':
          this.list(this.object);
          break;
        case 'code':
          this.code(this.object);
          break;
        default: console.error('villa, hlutur ekki höndlaður');
      }
    }
  }
}
