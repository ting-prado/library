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
const bookSpace = document.querySelector('#book-space');
const addBookUIBtn = document.querySelector('#UIBtn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const haveReadInput = document.querySelector('#have-read');
addBookUIBtn.addEventListener('click', addBook);

function addBook() {
    createCard(titleInput.value, authorInput.value, pagesInput.value, haveReadInput.value);
    titleInput.value="";
    authorInput.value="";
    pagesInput.value="";
    haveReadInput.value = "yes";
    closeUI();
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
}

let sampleBook = new Book("The Jasmine Throne", "Tasha Suri", "500", "yes");
myLibrary.push(sampleBook);
console.log(myLibrary);

function createCard(title, author, pages, haveRead) {
    const card = document.createElement('div');
    const titlePara = document.createElement('p');
    const authorPara = document.createElement('p');
    const pagesPara = document.createElement('p');
    titlePara.textContent = title;
    authorPara.textContent = author;
    pagesPara.textContent = pages + ' pages';
    titlePara.setAttribute('style', 'font-size: 28px; margin-bottom: 0.3em');
    authorPara.setAttribute('style', 'font-size: 20px; margin-bottom: 5px');
    pagesPara.setAttribute('style', 'font-size: 20px');
    card.classList.add('addCard');
    bookSpace.appendChild(card);
    card.appendChild(titlePara);
    card.appendChild(authorPara);
    card.appendChild(pagesPara);
}

createCard("The Jasmine Throne", "Tasha Suri", "500", "yes");
createCard("Twenty Thousand Leagues Under the Sea", "Jules Verne", "426", "yes");
createCard("Journey to the Center of the Earth", "Jules Verne", "384", "notyet");
createCard("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", "208", "notyet");
createCard("How to Invent Everything: A Survival Guide for the Stranded Time Traveler", "Ryan North", "794", "notyet");