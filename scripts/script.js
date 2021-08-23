const options = document.querySelectorAll('li');
options.forEach(option => {
    option.addEventListener('click', changeColor);
    option.addEventListener('click', changeDisplayedCards);
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

let i = localStorage.getItem('i');
i = (i) ? JSON.parse(i) : 1;
let myLibrary = localStorage.getItem('myLibrary');
myLibrary = (myLibrary) ? JSON.parse(myLibrary) : [];
myLibrary.forEach(book => {
    createCard(book.title, book.author, book.pages, book.haveRead, book.bookId);
});

function addBook() {
    if(titleInput.value !== '') {
        let bookNum = `bookNum${i}`;
        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, haveReadInput.value, bookNum);
        createCard(titleInput.value, authorInput.value, pagesInput.value, haveReadInput.value, bookNum);
        addBookToLibrary(newBook);
        i++;
        localStorage.setItem('i', i);
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

function Book(title, author, pages, haveRead, bookId) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.haveRead = haveRead,
    this.bookId = bookId;
}

function changeColor(e) {
    this.style.color = 'maroon';
    for(let i=0; i<options.length; i++){
        if(options[i].id != this.id) {
            options[i].style.color = 'black';
        }
    }
}

function createCard(title, author, pages, haveRead, bookNum) {
    const card = document.createElement('div');
    const titlePara = document.createElement('p');
    const authorPara = document.createElement('p');
    const pagesPara = document.createElement('p');
    const bottomCont = document.createElement('div');
    const toggleBg = document.createElement('div');
    const toggleCircle = document.createElement('div');
    const deleteBtn = document.createElement('div');
    card.setAttribute('id', bookNum);
    titlePara.textContent = title;
    authorPara.textContent = author;
    if(pages != ''){
        pagesPara.textContent = pages + ' pages';
    }
    titlePara.setAttribute('style', 'font-size: 28px; margin-bottom: 0.3em; display: inline-block');
    authorPara.setAttribute('style', 'font-size: 20px; margin-bottom: 5px');
    pagesPara.setAttribute('style', 'font-size: 20px');
    card.classList.add('addCard');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.textContent = 'x';
    bottomCont.classList.add('bottomCont');
    toggleBg.classList.add('toggleBg');
    toggleCircle.classList.add('toggleCircle');
    if(haveRead == 'notyet') {
        toggleCircle.setAttribute('style', 'margin-right: auto');
    }
    else {
        toggleCircle.setAttribute('style', 'margin-left: auto; background: #fff1ad');
        toggleBg.style.backgroundColor = 'black';
    }
    bookSpace.appendChild(card);
    card.appendChild(titlePara);
    card.appendChild(authorPara);
    card.appendChild(pagesPara);
    card.appendChild(bottomCont);
    bottomCont.appendChild(toggleBg);
    toggleBg.appendChild(toggleCircle);
    bottomCont.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', deleteBook);
}

function deleteBook(e) {
    
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function changeDisplayedCards(e) {
    if(this.id == 'firstOp'){ 

    } 
    else if(this.id == 'secondOp'){

    }
    else if(this.id == 'thirdOp'){

    }
}