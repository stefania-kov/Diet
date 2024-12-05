document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

function saveFormData() {
    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        active: document.getElementById('active').value,
    };

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
} 
const submitButton = document.getElementById('submit-button'); 
document.getElementById('submit-button').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение кнопки
    saveFormData(); // Сохраняем данные формы
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

