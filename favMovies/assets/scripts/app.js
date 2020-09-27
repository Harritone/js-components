//const addMovieBtn = document.querySelector('.btn-add');
const startAddMovieBtn = document.querySelector('header button');
const addMovieModal = document.getElementById('add-modal');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const backdrop = document.getElementById('backdrop');


const toggleModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
  };

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const cancelAddMovie = () => {
  toggleModal();
}

const backdropClickHandler = () => {
  toggleModal();
};

startAddMovieBtn.addEventListener('click', () => toggleModal());

backdrop.addEventListener('click', () => backdropClickHandler());

cancelAddMovieBtn.addEventListener('click', () => cancelAddMovie());
