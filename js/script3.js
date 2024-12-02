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
    
    // Считаем общие калории
    totalCalories += calories;

    // Сохраняем данные в Local Storage
    let foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
    foodEntries.push({ name: foodName, time: foodTime, calories: calories });
    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));

    // Обновляем итоговые калории
    document.getElementById('total-calories').innerText = totalCalories;

    // Сброс формы
    form.reset();
});

// Очистка данных
document.getElementById('clear-button').addEventListener('click', function() {
    totalCalories = 0;
    document.getElementById('total-calories').innerText = totalCalories;
});