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
    const container = document.querySelector("#books_container");
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
                <button class="toggle-read-btn" onclick="toggleReadStatus('${book.id}')">
                    ${book.read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button class="remove-btn" onclick="removeBook('${book.id}')">
                    Remove Book
                </button>
            </div>
        `;
        
        container.appendChild(bookCard);
    }
}

addBookToLibrary('x', 'x', 1, true);
addBookToLibrary('y', 'y', 2, false);
addBookToLibrary('z', 'z', 3, true);
addBookToLibrary('a', 'a', 4, true);