export default class Sort {
  constructor() {
    this.sortElement = document.querySelector('.sort');
    this.list = document.querySelector('.list');
  }

  load() {
    this.buttons = this.sortElement.querySelectorAll('button');
    this.buttons.forEach((element) => {
      element.addEventListener('click', e => this.select(e));
    });
  }

  select(event) {
    event.preventDefault();
    event.target.classList.toggle('selected');
    this.sortElement.classList.toggle(event.target.value);
    this.hideElements();
  }

  hideElements() {
    if (this.sortElement.classList.length < 2) {
      this.list.childNodes.forEach((element) => {
        element.classList.remove('--hidden');
      });
    } else {
      this.list.childNodes.forEach((element) => {
        element.classList.add('--hidden');
      });
    }
    if (this.sortElement.classList.contains('css')) {
      this.css = this.list.querySelectorAll('.css');
      this.css.forEach((element) => {
        element.classList.remove('--hidden');
      });
    }
    if (this.sortElement.classList.contains('html')) {
      this.html = this.list.querySelectorAll('.html');
      this.html.forEach((element) => {
        element.classList.remove('--hidden');
      });
    }
    if (this.sortElement.classList.contains('javascript')) {
      this.javascript = this.list.querySelectorAll('.javascript');
      this.javascript.forEach((element) => {
        element.classList.remove('--hidden');
      });
    }
  }
}
