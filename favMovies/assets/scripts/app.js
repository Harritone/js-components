//const addMovieBtn = document.querySelector('.btn-add');
const startAddMovieBtn = document.querySelector('header button');
const addMovieModal = document.getElementById('add-modal');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const backdrop = document.getElementById('backdrop');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

const movies = [];

const clearMovieInput = () => {
  //for(const userInput of userInputs) {
  //  userInput.value = '';
  //}
  userInputs.forEach(userInput => userInput.value = '');
};

const toggleModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
  clearMovieInput();
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
  const newMovie = {
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  }
  movies.push(newMovie);
  console.log(movies);
  toggleModal();
};

startAddMovieBtn.addEventListener('click', () => toggleModal());
backdrop.addEventListener('click', () => backdropClickHandler());
cancelAddMovieBtn.addEventListener('click', () => cancelAddMovieHandler());
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
