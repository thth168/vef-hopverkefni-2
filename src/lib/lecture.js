import Header from './header';
import Content from './content';
import { errorDisplay } from './helpers';
import Footer from './footer';

/**
 * Hlutur sem sér um að búa til fyrirlesturinn
 * @param {*} UrlSearchParam
 */

export default class Lecture {
  constructor(UrlSearchParam) {
    this.USP = new URLSearchParams(UrlSearchParam);
    this.slug = this.USP.get('slug');
  }

  /**
   * Function sem kallað er á til að búa til fyrirlesturinn
   */

  load() {
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
   * Function sem sér um að búa elementin
   * @param {*} data
   */

  displayData(data) {
    const lectureObj = data.find(obj => obj.slug === this.slug);
    const header = new Header(lectureObj.category, lectureObj.title, lectureObj.image);
    header.load();
    const content = new Content(lectureObj.content);
    content.load();
    const footer = new Footer(this.slug);
    footer.load();
  }
}
