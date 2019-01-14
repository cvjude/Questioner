const isAdmin = false;

const button = document.querySelectorAll('.button');
const form = document.querySelector('.can-hide');
const rsvp = document.querySelector('.rsvp');

button[0].addEventListener('click', () => {
  if (form.className === 'can-hide') {
    form.style.display = 'block';
    form.className = 'can-view';
    button[0].textContent = 'Post Question';
  } else {
    form.style.display = 'none';
    form.className = 'can-hide';
    button[0].textContent = 'Ask Question';
  }
});

const start = () => {
  if (isAdmin) {
    button[0].style.display = 'none';
    rsvp.style.display = 'none';
  }
};

onload = start();
