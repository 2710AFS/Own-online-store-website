// Ждем полной загрузки HTML-документа
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('action-btn');

    // Простая проверка работоспособности скрипта при клике
    button.addEventListener('click', () => {
        alert('Ура! JavaScript успешно подключен и работает!');
        console.log('Кнопка была нажата');
    });
});
