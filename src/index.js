import Lecture from './lib/lecture';
import LecturesHome from './lib/lectures-home';

function removeGrid(e) {
  if (e.key === 'V') {
    const grid = document.getElementById('grid');
    if (grid.disabled) {
      grid.disabled = false;
    } else grid.disabled = true;
  }

  if (e.key === 'B') {
    localStorage.clear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture__page');
  document.addEventListener('keydown', e => removeGrid(e));

  if (isLecturePage) {
    const lecture = new Lecture(window.location.search);
    lecture.load();
  } else {
    const lecturesHome = new LecturesHome();
    lecturesHome.load();
  }
});
