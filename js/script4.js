function displayNotes() {
    const notesContainer = document.getElementById('notes');
    let foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];

    foodEntries = deduplicateEntries(foodEntries);
    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));

    notesContainer.innerHTML = '';

     const groupedEntries = foodEntries.reduce((acc, entry, index) => {
        const date = entry.time.split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push({ ...entry, index });
        return acc;
    }, {});

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    const dates = Object.keys(groupedEntries);
    dates.sort((a, b) => new Date(a) - new Date(b));

    dates.forEach(date => {
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = formatDate(date);
        notesContainer.appendChild(dateHeader);

        groupedEntries[date].sort((a, b) => new Date(a.time) - new Date(b.time));

        groupedEntries[date].forEach(entry => {
          const noteCard = document.createElement('div');
          noteCard.className = 'col-md-4';
          const [time, additional] = entry.time.split('T');
            noteCard.innerHTML = `
                <div class="note-card">
                   <div class="note-time">${additional}</div>
                    <div class="note-title">${entry.name}</div>
                    <div class="note-calories" style="color: green;">${entry.calories} калорий</div>
                     <button class="edit-button btn btn-light mt-3" data-index="${entry.index}">Изменить</button>
                    <button class="delete-button btn btn-light mt-3" data-index="${entry.index}">Удалить</button>
                </div>
            `;
            notesContainer.appendChild(noteCard);
        });
    });

    // Add event listeners for buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
      deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index, 10);
            handleDelete(index);
        });
      });
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
          button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index, 10);
             handleEdit(index);
        });
      });
}

function handleDelete(index) {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    document.getElementById('deleteConfirmButton').dataset.index = index;
    deleteModal.show();
}
function deleteEntry() {
  const deleteButton = document.getElementById('deleteConfirmButton');
  const index = parseInt(deleteButton.dataset.index, 10);
  let foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
  foodEntries.splice(index, 1);
  localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
  displayNotes();
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    deleteModal.hide();
}

function handleEdit(index) {
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
    const entry = foodEntries[index];

    document.getElementById('edit-food-name').value = entry.name;
    document.getElementById('edit-food-calories').value = entry.calories;
    document.getElementById('edit-food-time').value = entry.time;
    document.getElementById('edit-index').value = index;
    editModal.show();
}

function saveEditedEntry() {
    const index = parseInt(document.getElementById('edit-index').value, 10);
    const newName = document.getElementById('edit-food-name').value;
    const newCalories = parseInt(document.getElementById('edit-food-calories').value);
    const newTime = document.getElementById('edit-food-time').value;

    let foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
    foodEntries[index] = { name: newName, calories: newCalories, time: newTime };
    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
    displayNotes();
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();

}

function deduplicateEntries(entries) {
    const seenEntries = new Set();
    return entries.filter(entry => {
        const key = `${entry.name}-${entry.time}-${entry.calories}`;
        if (seenEntries.has(key)) {
            return false;
        }
        seenEntries.add(key);
        return true;
    });
}

function clearData() {
    localStorage.removeItem('foodEntries');
    document.getElementById('notes').innerHTML = '';
}

document.getElementById('deleteConfirmButton').addEventListener('click', deleteEntry);
document.getElementById('editSaveButton').addEventListener('click', saveEditedEntry);
displayNotes();