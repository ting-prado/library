let myLibrary = [],
    i = 1;

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
const bookSpace = document.querySelector('#book-space');
const addBookUIBtn = document.querySelector('#UIBtn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const haveReadInput = document.querySelector('#have-read');
addBookUIBtn.addEventListener('click', addBook);

let retrievedBooks = localStorage.getItem('bookData');
let savedBooks = JSON.parse(retrievedBooks);
let savedCards = localStorage.getItem('bookCards');
if(retrievedBooks) {
    console.log(retrievedBooks);
    bookSpace.innerHTML = savedCards;
}

function addBook() {
    if(titleInput.value !== '') {
        createCard(titleInput.value, authorInput.value, pagesInput.value, haveReadInput.value, i);
        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, haveReadInput.value);
        addBookToLibrary(newBook);
        titleInput.value="";
        authorInput.value="";
        pagesInput.value="";
        haveReadInput.value = "yes";
        closeUI();
    }
    else {
        alert('Please enter a title.');
    }
}

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
    this.bookId = 'bookNum' + i;
    i++;
}

function createCard(title, author, pages, haveRead, bookNum) {
    const card = document.createElement('div');
    const titlePara = document.createElement('p');
    const authorPara = document.createElement('p');
    const pagesPara = document.createElement('p');
    card.setAttribute('class', 'card');
    card.setAttribute('id', `cardNum${i}`);
    titlePara.textContent = title;
    authorPara.textContent = author;
    if(pages != ''){
        pagesPara.textContent = pages + ' pages';
    }
    titlePara.setAttribute('style', 'font-size: 28px; margin-bottom: 0.3em');
    authorPara.setAttribute('style', 'font-size: 20px; margin-bottom: 5px');
    pagesPara.setAttribute('style', 'font-size: 20px');
    card.classList.add('addCard');
    bookSpace.appendChild(card);
    card.appendChild(titlePara);
    card.appendChild(authorPara);
    card.appendChild(pagesPara);
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    saveBook();
}

function saveBook() {
    localStorage.setItem('bookData', JSON.stringify(myLibrary));
    localStorage.setItem('bookCards', bookSpace.innerHTML);
}