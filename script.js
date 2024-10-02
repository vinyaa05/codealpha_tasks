const bookForm = document.getElementById('book-form');
const booksList = document.getElementById('books');
const searchInput = document.getElementById('searchInput');

// Load books from local storage
let books = JSON.parse(localStorage.getItem('books')) || [];

// Function to render books
function renderBooks(filter = '') {
    booksList.innerHTML = '';
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(filter.toLowerCase()) || 
        book.author.toLowerCase().includes(filter.toLowerCase())
    );

    filteredBooks.forEach((book, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${book.title} by ${book.author} 
                              <button class="delete-btn" data-index="${index}">Delete</button>`;
        booksList.appendChild(listItem);
    });

    if (filteredBooks.length === 0) {
        const noBooksMessage = document.createElement('li');
        noBooksMessage.textContent = 'No books found';
        booksList.appendChild(noBooksMessage);
    }

    // Add delete functionality to buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteBook);
    });
}

// Add new book
bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const newBook = { title, author };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
    bookForm.reset();
});

// Delete a book
function deleteBook(event) {
    const index = event.target.getAttribute('data-index');
    books.splice(index, 1); // Remove the book from the array
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
}

// Search functionality
searchInput.addEventListener('input', function() {
    renderBooks(searchInput.value);
});

// Initial render
renderBooks();
