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

let myLibrary = localStorage.getItem('myLibrary');
myLibrary = (myLibrary) ? JSON.parse(myLibrary) : [];
let savedCards = localStorage.getItem('bookCards');
if(savedCards) {
    bookSpace.innerHTML = savedCards;
}

function addBook() {
    if(titleInput.value !== '') {
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
    for(let i=0; i<options.length; i++){
        if(options[i].id != this.id) {
            options[i].style.color = 'black';
        }
    }
}

function Book(title, author, pages, haveRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.haveRead = haveRead,
    this.card = createCard(this.title, this.author, this.pages, this.haveRead);
}

function createCard(title, author, pages, haveRead) {
    const card = document.createElement('div');
    const titlePara = document.createElement('p');
    const authorPara = document.createElement('p');
    const pagesPara = document.createElement('p');
    const bottomCont = document.createElement('div');
    const toggleBg = document.createElement('div');
    const toggleCircle = document.createElement('div');
    const deleteBtn = document.createElement('div');
    let i = Math.floor(Math.random()*1000);
    if(myLibrary != ''){
        if(myLibrary.includes(`cardNum${i}`)){
            card.id = `cardNum${Math.floor(Math.random()*(1999) + 1000)}`;
        }
        else {
            card.id = `cardNum${i}`;
        }
    }
    else{
        card.id = `cardNum${i}`;
    }
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
    return card.id;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    saveBook();
}

function saveBook() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    localStorage.setItem('bookCards', bookSpace.innerHTML);
}

function changeDisplayedCards(e) {
    let currentCards = localStorage.getItem('bookCards'); 
    if(this.id == 'firstOp'){ 
        bookSpace.innerHTML = currentCards; 
    } 
    else if(this.id == 'secondOp'){
        bookSpace.innerHTML = currentCards;  
        myLibrary.forEach(card => { 
        if(card.haveRead == 'yes') { 
            let cardDiv = document.querySelector(`#${card.card}`);
            bookSpace.removeChild(cardDiv);
        } 
    }); 
    }
    else if(this.id == 'thirdOp'){
        bookSpace.innerHTML = currentCards; 
        myLibrary.forEach(card => { 
        if(card.haveRead == 'notyet') { 
            let cardDiv = document.querySelector(`#${card.card}`);
            bookSpace.removeChild(cardDiv);
            } 
        }); 
    }
}