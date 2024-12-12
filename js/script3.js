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

let foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];

foodEntries.forEach(entry => {
    totalCalories += entry.calories;
});
document.getElementById('total-calories').innerText = totalCalories;

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const calories = parseInt(document.getElementById('food-calories').value);
    const foodName = document.getElementById('food-name').value;
    const foodTime = document.getElementById('food-time').value;

    totalCalories += calories;

    foodEntries.push({ name: foodName, time: foodTime, calories: calories });

    const mealTime = document.querySelector('input[name="meal-time"]:checked');
    if (mealTime) {
        foodEntries[foodEntries.length - 1].mealTime = mealTime.value; 
    }

    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
    document.getElementById('total-calories').innerText = totalCalories;

    const blob = new Blob([JSON.stringify(foodEntries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dnevnik.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});


document.getElementById('clear-button').addEventListener('click', function() {
    const clearModal = new bootstrap.Modal(document.getElementById('clearModal'));
    clearModal.show();
});

document.getElementById('confirm-clear').addEventListener('click', function() {
    const clearOption = document.getElementById('clearOption').value;

    if (clearOption === 'form') {
        form.reset();
    } else if (clearOption === 'total') {
        totalCalories = 0;
        document.getElementById('total-calories').innerText = totalCalories;
    } else if (clearOption === 'all') {
        totalCalories = 0;
        foodEntries = [];
        document.getElementById('total-calories').innerText = totalCalories;
        form.reset();
    }
    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));

    const clearModal = bootstrap.Modal.getInstance(document.getElementById('clearModal'));
    clearModal.hide();
});
