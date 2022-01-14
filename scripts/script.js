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
i = (i) ? JSON.parse(i) : 2;
let myLibrary = localStorage.getItem('myLibrary');
myLibrary = (myLibrary) ? JSON.parse(myLibrary) : [{
    title: 'Twenty Thousand Leagues Under the Sea',
    author: 'Jules Verne',
    bookId: 'bookNum1',
    haveRead: 'yes',
    pages: '426'
}];

myLibrary.forEach(book => {
    createCard(book.title, book.author, book.pages, book.haveRead, book.bookId);
});

function addBook() {
    if(titleInput.validity.valid && authorInput.validity.valid && pagesInput.validity.valid){
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
        options[0].style.color = 'maroon';
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
    toggleBg.addEventListener('click', changeReadStatus);
    bottomCont.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', deleteBook);
}

function changeReadStatus(e) {
    let bookId = this.parentNode.parentNode.id;
    let book = myLibrary.find(book => book.bookId == bookId);
    const toggleCircle = document.querySelector(`#${bookId} .toggleCircle`);
    const toggleBg = document.querySelector(`#${bookId} .toggleBg`);
    if(book.haveRead == 'notyet') {
        toggleCircle.setAttribute('style', 'margin-left: auto; background: #fff1ad');
        toggleBg.setAttribute('style', 'background: black');
        book.haveRead = 'yes';
    }
    else {
        toggleCircle.setAttribute('style', 'margin-right: auto; background: black');
        toggleBg.style.backgroundColor = '#fff1ad';
        book.haveRead = 'notyet';
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function deleteBook(e) {
    myLibrary.forEach(book => {
        if(e.path[2].id == book.bookId){
            let index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        }
        bookSpace.innerHTML = "";
        myLibrary.forEach(book => {
            createCard(book.title, book.author, book.pages, book.haveRead, book.bookId);
        });
    });
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function changeDisplayedCards(e) {
    if(this.id == 'firstOp'){ 
        bookSpace.innerHTML = "";
        myLibrary.forEach(book => {
            createCard(book.title, book.author, book.pages, book.haveRead, book.bookId);
        });
    } 
    else if(this.id == 'secondOp'){
        bookSpace.innerHTML = "";
        myLibrary.forEach(book => {
            if(book.haveRead == 'notyet'){
                createCard(book.title, book.author, book.pages, book.haveRead, book.bookId);
            }
        });
    }
    else if(this.id == 'thirdOp'){
        bookSpace.innerHTML = "";
        myLibrary.forEach(book => {
            if(book.haveRead == 'yes'){
                createCard(book.title, book.author, book.pages, book.haveRead, book.bookId);
            }
        });
    }
}