import Header from './header';
import List from './list';
import Sort from './sorting';

/**
 * Hlutur sem sér um að búa til heimasíðuna
 */

export default class LecturesHome {
  constructor() {
    this.headerContainer = document.querySelector('.header');
  }

  /**
   * function sem sér um að byrta hlutina á heimasíðunni
   */

  load() {
    this.header = new Header('Vefforritun', 'Fyrirlestrar', './img/header.jpg', this.headerContainer);
    this.header.load();
    this.sorter = new Sort();
    this.sorter.load();
    this.list = new List();
    this.list.load();
  }
}
