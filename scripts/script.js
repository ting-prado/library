const options = document.querySelectorAll('li');
options.forEach(option => {
    option.addEventListener('click', changeColor);
});

function changeColor(e) {
    this.style.color = 'maroon';
    for(let i=1; i<options.length; i++){
        if(options[i].id != this.id) {
            options[i].style.color = 'black';
        }
    }
}
