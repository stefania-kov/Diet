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

