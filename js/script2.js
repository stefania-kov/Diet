document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('personal-form');
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); 

        // Получаем значения из формы
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const gender = document.getElementById('gender').value;
        const height = parseFloat(document.getElementById('height').value);
        const active = document.getElementById('active').value;

        // Проверяем, что вес и рост положительные
        if (weight < 0 || height < 0) {
            alert("Вес и рост должны быть положительными числами.");
            return;
        }

        // Создаем сообщение
        const message = `
            Имя пользователя: ${name}
            Возраст: ${age}
            Пол: ${gender}
            Вес: ${weight}
            Рост: ${height}
            Активность: ${active}
        `;

        // Выводим сообщение в всплывающем окне
        alert(message);
    });
});

