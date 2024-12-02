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

function displayNotes() {
    const notesContainer = document.getElementById('notes');
    const foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];

    notesContainer.innerHTML = '';

    const groupedEntries = foodEntries.reduce((acc, entry) => {
        const date = entry.time.split('T')[0];
        if (!acc[date]) {
            acc[date] = []; 
        }
        acc[date].push(entry); 
        return acc;
    }, {});

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    for (const date in groupedEntries) {
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = formatDate(date);
        notesContainer.appendChild(dateHeader);

        groupedEntries[date].forEach(entry => {
            const noteCard = document.createElement('div');
            noteCard.className = 'col-md-4'; 
            const [time, additional] = entry.time.split('T'); 
            noteCard.innerHTML = `
                <div class="note-card">
                    <div class="note-time">${additional}</div>
                    <div class="note-title">${entry.name}</div>
                    <div class="note-calories" style="color: green;">${entry.calories} калорий</div> 
                </div>
            `;
            notesContainer.appendChild(noteCard);
        });
    }
}

function clearData() {
    localStorage.removeItem('foodEntries');
    document.getElementById('notes').innerHTML = '';
}

displayNotes();
