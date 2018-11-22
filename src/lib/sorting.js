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
    console.log(event.target.value);
    event.target.classList.toggle('selected');
    this.sortElement.classList.toggle(event.target.value);
    this.hideElements();
  }

  hideElements() {
    this.sort
  }
}
