const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    let id = crypto.randomUUID();
    const book = {
        id: id,
        title: title,
        author: author,
        pages: pages,
        read: read
    }
    myLibrary.push(book)
    displayBooks();
}

function displayBooks() {
    const container = document.querySelector("#books-container");
    container.innerHTML = '';
    
    for(let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const bookCard = document.createElement('div');
        bookCard.classList.add("book-card");
        bookCard.setAttribute('data-id', book.id);
        
        bookCard.innerHTML = `
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <p class="book-pages">${book.pages} pages</p>
            <p class="book-status ${book.read ? 'read' : 'unread'}">
                ${book.read ? 'Read' : 'Not Read'}
            </p>
            <div class="book-actions">
                <button class="custom-btn btn-3" onclick="toggleReadStatus('${book.id}')">
                   <span>${book.read ? 'Mark as Unread' : 'Mark as Read'} </span>
                </button>
                <button class="custom-btn btn-3" onclick="removeBook('${book.id}')">
                   <span>Remove Book</span>
                </button>
            </div>
        `;
        
        container.appendChild(bookCard);
    }
}
const dialog = document.querySelector("dialog");

function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    book.read = !book.read;
    displayBooks();
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function addBook(){
    const show = document.querySelector("#add-book");
    dialog.showModal();
}

document.querySelector('form').addEventListener('submit', function(e) {
    const author = document.getElementById('author').value.trim();
    const title = document.getElementById('title').value.trim();
    const pages = document.getElementById('pages').value.trim();

    if (!author || !title || !pages) {
        e.preventDefault();
        alert('Please fill in all required fields.');
    }
    else {
        e.preventDefault();
        const read = document.getElementById('read').checked;
        addBookToLibrary(title, author, pages, read);
        displayBooks();
        this.reset();
        dialog.close();
    }
});

const cancelBtn = dialog.querySelector('button[value="cancel"]');
const form = dialog.querySelector('form');

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent any default action
    form.reset();       // Reset form fields
    dialog.close();     // Close the dialog
});
