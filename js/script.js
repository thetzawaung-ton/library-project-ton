const myLibrary = [
    {title: 'Nway', author: 'Ohn', pages: 223, readStatus: 'read'}
];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages  = pages;
    this.readStatus = readStatus;
}

const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const openBtn = document.querySelector('.open-dialog');
const dialogElem = document.querySelector('dialog');
const closeBtn = document.querySelector('.close-dialog');
const form = document.querySelector('form');

function addBookToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    checkLibrary();
}

function checkLibrary() {
    while(tbody.firstChild) {
        tbody.firstChild.remove();
    }
    myLibrary.forEach(function(book) {
    const bookrow = document.createElement('tr');
    const title = document.createElement('td');
    const author = document.createElement('td');
    const pages = document.createElement('td');
    const readStatus = document.createElement('td');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    readStatus.textContent = book.readStatus;

    bookrow.append(title, author, pages, readStatus);
    tbody.appendChild(bookrow);
    })
}
checkLibrary();

openBtn.addEventListener('click', function() {
    dialogElem.showModal();
})

closeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    dialogElem.close();
})

form.addEventListener('submit', function(event) {
    const formTitle = document.querySelector('#title').value;
    const formAuthor = document.querySelector('#author').value;
    const formPages = document.querySelector('#pages').value;
    const formReadStatus = document.querySelector('#read_status:checked') ? "Read" : "Unread";

    addBookToLibrary(formTitle, formAuthor, formPages, formReadStatus);
    event.preventDefault();
    form.reset();
    dialogElem.close();
})
