// Управление мобильным меню
const burgerBtn = document.querySelector('.burger-btn');
const navMenu = document.querySelector('.nav-menu');
const authGroup = document.querySelector('.auth-group');

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    authGroup.classList.toggle('active');
    burgerBtn.classList.toggle('active');
  });
}

// Закрываем меню при клике на ссылку
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navMenu.classList.remove('active');
    authGroup.classList.remove('active');
    burgerBtn.classList.remove('active');
  });
});
