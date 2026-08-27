document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.burger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-item, .mobile-auth button');

    // Функция переключения меню
    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Обновляем доступность для скринридеров
        burgerBtn.setAttribute('aria-expanded', isOpen);
    };

    // 1. Клик по кнопке гамбургера
    burgerBtn.addEventListener('click', toggleMenu);

    // 2. Закрытие меню при клике на любую ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. Закрытие при клике вне области меню
    document.addEventListener('click', (event) => {
        const isClickInside = navMenu.contains(event.target) || burgerBtn.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});
