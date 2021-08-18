let myLibrary = [];

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

const addBook = document.querySelector('#add-book');
addBook.addEventListener('click', getUserInput);

function getUserInput() {
    const div = document.createElement('div');
    const container = document.querySelector('body');
    div.classList.add('createdDiv');
    container.appendChild(div);
}

function Book(title, author, pages, haveRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.haveRead = haveRead;
}

function addBookToLibrary() {
}