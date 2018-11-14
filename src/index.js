import Lecture from './lib/lecture';
import LecturesHome from './lib/lectures-home';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const lecture = new Lecture(window.location.search);
    lecture.load();
  } else {
    const lecturesHome = new LecturesHome();
    lecturesHome.load();
  }
});
