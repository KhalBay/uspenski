document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('seminarForm');
    const messageDiv = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Очищаем предыдущее сообщение
            messageDiv.textContent = '';
            messageDiv.style.color = '#000';

            // Проверяем обязательные поля
            const fio = document.getElementById('fio').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!fio || !email) {
                messageDiv.textContent = '⚠️ Пожалуйста, заполните поля "ФИО" и "E-mail".';
                messageDiv.style.color = '#b22222';
                return;
            }

            // Простейшая проверка email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                messageDiv.textContent = '⚠️ Введите корректный E-mail адрес.';
                messageDiv.style.color = '#b22222';
                return;
            }

            // Собираем данные
            const formData = new FormData(form);

            // Отправляем на сервер
            fetch('send_form.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        messageDiv.textContent = '✅ Ваша заявка успешно отправлена!';
                        messageDiv.style.color = '#006400';
                        form.reset();
                    } else {
                        messageDiv.textContent = '❌ Ошибка: ' + (data.message || 'попробуйте позже.');
                        messageDiv.style.color = '#b22222';
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    messageDiv.textContent = '❌ Произошла сетевая ошибка. Проверьте соединение.';
                    messageDiv.style.color = '#b22222';
                });
        });
    }
});