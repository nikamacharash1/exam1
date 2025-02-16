document.addEventListener('DOMContentLoaded', () => {
    const books = [
        { id: 1, title: 'მე ბებია ილიკო და ილარიონი', author: 'ნოდარ დუმბაძე' },
        { id: 2, title: 'მზიანი ღამე', author: 'ნოდარ დუმბაძე' },
        { id: 3, title: 'თეთრი ბაირაღები', author: 'ნოდარ დუმბაძე' }
    ];

    const bookList = document.getElementById('book-list');
    const libraryList = document.getElementById('library-list');

    function renderBooks() {
        bookList.innerHTML = '';
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <button onclick="addToLibrary(${book.id})">add to list</button>
            `;
            bookList.appendChild(bookElement);
        });
    }

    function renderLibrary() {
        libraryList.innerHTML = '';
        const library = JSON.parse(localStorage.getItem('library')) || [];
        library.forEach(book => {
            const libraryBook = document.createElement('div');
            libraryBook.className = 'library-book';
            libraryBook.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <div class="read-status">status: ${book.read ? 'read' : 'not read'}</div>
                <button onclick="toggleReadStatus(${book.id})">change</button>
                <button onclick="removeFromLibrary(${book.id})">move to bin</button>
            `;
            libraryList.appendChild(libraryBook);
        });
    }

    window.addToLibrary = (id) => {
        const book = books.find(b => b.id === id);
        if (book) {
            const library = JSON.parse(localStorage.getItem('library')) || [];
            if (!library.find(b => b.id === id)) {
                library.push({ ...book, read: false });
                localStorage.setItem('library', JSON.stringify(library));
                renderLibrary();
            }
        }
    };

    window.removeFromLibrary = (id) => {
        let library = JSON.parse(localStorage.getItem('library')) || [];
        library = library.filter(b => b.id !== id);
        localStorage.setItem('library', JSON.stringify(library));
        renderLibrary();
    };

    window.toggleReadStatus = (id) => {
        let library = JSON.parse(localStorage.getItem('library')) || [];
        const book = library.find(b => b.id === id);
        if (book) {
            book.read = !book.read;
            localStorage.setItem('library', JSON.stringify(library));
            renderLibrary();
        }
    };

    renderBooks();
    renderLibrary();
});



















