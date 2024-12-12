const textElements = document.querySelectorAll('h2');

textElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.color = 'green';
    });

    element.addEventListener('mouseout', () => {
        element.style.color = 'black'; 
    });
});
 

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

let totalCalories = 0;
const form = document.getElementById('food-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const calories = parseInt(document.getElementById('food-calories').value);
    const foodName = document.getElementById('food-name').value;
    const foodTime = document.getElementById('food-time').value;

    totalCalories += calories;

    let foodEntries = localStorage.getItem('foodEntries') ? localStorage.getItem('foodEntries').split('\n') : []; // Получаем данные из localStorage
    const newEntry = `${foodName},${foodTime},${calories}`; // Формируем строку для новой записи

    const mealTime = document.querySelector('input[name="meal-time"]:checked');
    if (mealTime) {
      newEntry += `,${mealTime.value}`; // Добавляем время приема пищи, если выбрано
    }

    foodEntries.push(newEntry);
    localStorage.setItem('foodEntries', foodEntries.join('\n'));

    document.getElementById('total-calories').innerText = totalCalories;

    const text = foodEntries.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dnevnik.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});