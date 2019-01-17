const isAdmin = false;

const button = document.querySelector('.button');
const form = document.querySelector('.can-hide');

button.addEventListener('click', () => {
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

const start = () => {
  if (isAdmin) {
    button.style.display = 'none';
  }
};

onload = start();
