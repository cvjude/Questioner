const isAdmin = false;

const button = document.querySelectorAll('.button');
const form = document.querySelector('.can-hide');

button[0].addEventListener('click', () => {
  if (form.className === 'can-hide') {
    form.style.display = 'block';
    form.className = 'can-view';
    button.textContent = 'Post comment';
  } else {
    form.style.display = 'none';
    form.className = 'can-hide';
    button.textContent = 'Make comment';
  }
});

button[1].addEventListener('click', (event) => {
  if (form.className === 'can-hide') {
    button[0].textContent = 'Post comment';
    form.style.display = 'block';
    form.className = 'can-view';
  } else {
    form.style.display = 'none';
    form.className = 'can-hide';
    button[0].textContent = 'Add comment';
  }
});

const start = () => {
  if (isAdmin) {
    button.style.display = 'none';
  }
};

onload = start();
