document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (С сохранением в localStorage) ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('multi-shop-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('multi-shop-theme', newTheme);
    });


    // --- 2. КНОПКА "ПОКАЗАТЬ ЕЩЕ" (Распределение новых товаров по секциям) ---
    const loadMoreBtn = document.getElementById('load-more');
    
    // Получаем ссылки на три разные сетки товаров из HTML
    const gridClothes = document.getElementById('grid-clothes');
    const gridTech = document.getElementById('grid-tech');
    const gridBooks = document.getElementById('grid-books');

    // Массив новых карточек
    const additionalProducts = [
        { title: 'Худи хлопковое', category: 'clothes', categoryRu: 'Одежда', price: '3 500 ₽', img: 'https://stockmann.ru/pi/bx2/555/5689555/5689555-01.jpg@webp' },
        { title: 'Умные часы', category: 'tech', categoryRu: 'Техника', price: '12 900 ₽', img: 'https://tse4.mm.bing.net/th/id/OIP.hd-qFA5SCrTPI4JPOks3nQHaH0?pid=Api&h=220&P=0' },
        { title: 'Роман «Дюна»', category: 'books', categoryRu: 'Книги', price: '680 ₽', img: 'https://cdn1.ozone.ru/s3/multimedia-1-8/c600/7054425512.jpg' }
    ];

    loadMoreBtn.addEventListener('click', () => {
        additionalProducts.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.setAttribute('data-category', product.category);
            
            card.innerHTML = `
                <div class="product-image" style="background-image: url('${product.img}');"></div>
                <div class="product-info">
                    <span class="category-badge">${product.categoryRu}</span>
                    <h3>${product.title}</h3>
                    <div class="product-footer">
                        <span class="price">${product.price}</span>
                        <button class="btn-buy">Купить</button>
                    </div>
                </div>
            `;

            // Умное распределение: добавляем карточку в соответствующую её типу сетку
            if (product.category === 'clothes' && gridClothes) {
                gridClothes.appendChild(card);
            } else if (product.category === 'tech' && gridTech) {
                gridTech.appendChild(card);
            } else if (product.category === 'books' && gridBooks) {
                gridBooks.appendChild(card);
            }
        });

        // Скрываем кнопку подгрузки
        loadMoreBtn.style.display = 'none';
    });


    // --- 3. ВАЛИДАЦИЯ ФОРМЫ И ВЫВОД В CONSOLE.LOG ---
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        let isValid = true;

        // Валидация имени
        const nameError = document.getElementById('name-error');
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Имя должно содержать от 2-х символов';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Валидация Email
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Некорректный формат email';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Вывод результатов
        if (isValid) {
            console.log('📦 --- ДАННЫЕ ЗАКАЗА/ФОРМЫ --- 📦');
            console.log('Имя:', nameInput.value.trim());
            console.log('Email:', emailInput.value.trim());
            console.log('Сообщение:', document.getElementById('message').value.trim());
            console.log('-----------------------------------');
            
            alert('Форма отправлена! Информация добавлена в консоль браузера.');
            form.reset();
        }
    });
});
