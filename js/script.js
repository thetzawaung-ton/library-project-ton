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
