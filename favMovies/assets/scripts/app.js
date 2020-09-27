//const addMovieBtn = document.querySelector('.btn-add');
const startAddMovieBtn = document.querySelector('header button');
const addMovieModal = document.getElementById('add-modal');
const btnCancel = document.querySelector('.btn-add');
//const backdrop = document.getElementById('backdrop');


const toggleModal = () => {
  addMovieModal.classList.toggle('visible');
  backdrop.classList.toggle('visible');
  };


startAddMovieBtn.addEventListener('click', () => {
  //addMovieModal.classList.toggle('visible');
  toggleModal();
});

backdrop.addEventListener('click', () => {
  toggleModal();
})

btnCancel.addEventListener('click', () => {
  //toggleVisibilityModal();
})
