class Book {
    constructor(title, author, pages, readStatus) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages  = pages;
        this.readStatus = readStatus;
    }
}

const myLibrary = [
    new Book('The Stranger', 'Albert Camus', 144, 'Read'),
    new Book('1Q84', 'Haruki Murakami', 1184, 'Not Read'),
];

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
    const deleteBtnContainer = document.createElement('td');
    const deleteBtn = document.createElement('button');
    const changeReadStatus = document.createElement('button');

    deleteBtn.classList.add('bookrow-delete');
    changeReadStatus.classList.add('change-read-status');
    readStatus.classList.add('no-wrap');

    bookrow.setAttribute('data-book-id', book.id);

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    readStatus.textContent = book.readStatus;
    deleteBtn.textContent = "Delete";
    changeReadStatus.textContent = "Change";

    readStatus.appendChild(changeReadStatus);
    deleteBtnContainer.appendChild(deleteBtn);

    bookrow.append(title, author, pages, readStatus, deleteBtnContainer);
    tbody.appendChild(bookrow);
    })
}
checkLibrary();

openBtn.addEventListener('click', function() {
    dialogElem.showModal();
    const errorMessages = document.querySelectorAll("span");
    errorMessages.forEach(message => {
        message.textContent = "";
    })
})

closeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    form.reset();
    dialogElem.close();
})
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const titleError = document.querySelector(".title-error");
const authorError = document.querySelector(".author-error");
const pagesError = document.querySelector(".pages-error");

title.addEventListener("input", function() {
    if(title.validity.valid) {
        titleError.textContent = "";
    } else {
        titleError.textContent = "Title must be filled";
    }
});

author.addEventListener("input", function() {
    if(author.validity.valid) {
        authorError.textContent = "";
    } else {
        authorError.textContent = "Author name must be filled";
    }
})

pages.addEventListener("input", function() {
    if(pages.validity.valid) {
        pagesError.textContent = "";
    } else if (pages.validity.rangeUnderflow) {
        pagesError.textContent = "Pages count must be more than 0";
    } else {
        pagesError.textContent = "Pages count must be filled";
    }
})

form.addEventListener('submit', function(event) {
    if(title.validity.valueMissing) {
        titleError.textContent = "Title must be filled";
        event.preventDefault();
    }
    if(author.validity.valueMissing) {
        authorError.textContent = "Author name must be filled";
        event.preventDefault();
    }
    if(pages.validity.valueMissing) {
        pagesError.textContent = "Pages count must be filled";
        event.preventDefault();
    } else if(pages.validity.rangeUnderflow){
        pagesError.textContent = "Pages count must be more than 0";
        event.preventDefault();
    }
    else {
    const formTitle = document.querySelector('#title').value;
    const formAuthor = document.querySelector('#author').value;
    const formPages = document.querySelector('#pages').value;
    const formReadStatus = document.querySelector('#read_status:checked') ? "Read" : "Not Read";

    addBookToLibrary(formTitle, formAuthor, formPages, formReadStatus);
    event.preventDefault();
    form.reset();
    dialogElem.close();
    }
})

tbody.addEventListener('click', function(event) {
    
    if (event.target.classList.contains('bookrow-delete')) {
        
        const row = event.target.closest('tr');
        const bookId = row.getAttribute('data-book-id');

        const bookIndex = myLibrary.findIndex(book => book.id == bookId);
        if (bookIndex > -1) {
            myLibrary.splice(bookIndex, 1);
        }
        checkLibrary();
    }
});

tbody.addEventListener('click', function(event) {
    
    if (event.target.classList.contains('change-read-status')) {
        
        const row = event.target.closest('tr');
        const bookId = row.getAttribute('data-book-id');

        const bookIndex = myLibrary.findIndex(book => book.id == bookId);
        if (bookIndex > -1) {
            myLibrary[bookIndex].readStatus = (myLibrary[bookIndex].readStatus == "Read") ? 
                                            "Not Read" : "Read";
        }
        checkLibrary();
    }
});
