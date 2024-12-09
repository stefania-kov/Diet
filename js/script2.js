document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('personal-form');
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); 

        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const gender = document.getElementById('gender').value;
        const height = parseFloat(document.getElementById('height').value);
        const active = document.getElementById('active').value;

        if (weight < 0 || height < 0 || age < 0) {
            alert("Пожалуйста, убедитесь, что вес, рост и возраст все являются положительными числами.");
            return;
        }
        

        const message = `
            Имя пользователя: ${name}
            Возраст: ${age}
            Пол: ${gender}
            Вес: ${weight}
            Рост: ${height}
            Активность: ${active}
        `;

        alert(message);
    });
});

