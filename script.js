document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            generateAndDownloadDoc();
        });
    }

    function generateAndDownloadDoc() {
        // Формируем текст для Word-документа (чистый текст, без HTML)
        const docContent = `
ЗАЯВКА НА УЧАСТИЕ
в 53-й сессии Международного семинара
им. Д.Г. Успенского-В.Н. Страхова
«ВОПРОСЫ ТЕОРИИ И ПРАКТИКИ ГЕОЛОГИЧЕСКОЙ ИНТЕРПРЕТАЦИИ ГРАВИТАЦИОННЫХ, МАГНИТНЫХ И ЭЛЕКТРИЧЕСКИХ ПОЛЕЙ»
Тюмень, 1-4 февраля 2027 г.

ФИО ___________________________________
Должность ______________________________
Учёная степень, учёное звание _____________
Организация _____________________________
Адрес __________________________________
Телефон ________________________________
E-mail __________________________________
Название доклада ________________________
_______________________________________
_______________________________________
Форма доклада: ☐ устный    ☐ стендовый    ☐ on-line

Заполненную форму отправьте на email: uspenskiy.strahov.2027@yandex.ru
        `;

        // Создаём Blob как текстовый файл
        // Важно: используем application/msword для правильного определения Word
        const blob = new Blob([docContent], {
            type: 'application/msword;charset=utf-8'
        });

        // Создаём ссылку для скачивания
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Zayavka_53_sessiya_Tyumen_2027.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }
});