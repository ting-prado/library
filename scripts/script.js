let myLibrary = [];

const options = document.querySelectorAll('li');
options.forEach(option => {
    option.addEventListener('click', changeColor);
});

const toBlur = document.querySelectorAll('.toBlur');
const addBookUI = document.querySelector('.addBookUI');
const addBookBtn = document.querySelector('#addBookBtn');
addBookBtn.addEventListener('click', openUI);
toBlur.forEach(element => {
    element.addEventListener('click', closeUI);
})
const addBookUIBtn = document.querySelector('click', addBook);

function openUI() {
    if(addBookUI.style.display == 'none') {
        addBookUI.style.display = 'flex';
        toBlur.forEach(element => {
            element.classList.add('toBlurEffect');
        });
    }
    else {
        addBookUI.style.display = 'none';
        toBlur.forEach(element => {
            element.classList.remove('toBlurEffect');
        });
    }
}

function closeUI() {
    if(addBookUI.style.display == 'flex'){
        addBookUI.style.display = 'none';
        toBlur.forEach(element => {
            element.classList.remove('toBlurEffect');
        });
    }
    else return;
}

function changeColor(e) {
    this.style.color = 'maroon';
    for(let i=1; i<options.length; i++){
        if(options[i].id != this.id) {
            options[i].style.color = 'black';
        }
    }
}

function Book(title, author, pages, haveRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.haveRead = haveRead;
}

function addBookToLibrary() {
}