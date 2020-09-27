//const addMovieBtn = document.querySelector('.btn-add');
const startAddMovieBtn = document.querySelector('header button');
const addMovieModal = document.getElementById('add-modal');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const backdrop = document.getElementById('backdrop');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');


const toggleModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
  };

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const cancelAddMovieHandler = () => {
  toggleModal();
}

const backdropClickHandler = () => {
  toggleModal();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if(titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || ratingValue < 1 || ratingValue > 5) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }
};

startAddMovieBtn.addEventListener('click', () => toggleModal());
backdrop.addEventListener('click', () => backdropClickHandler());
cancelAddMovieBtn.addEventListener('click', () => cancelAddMovieHandler());
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
