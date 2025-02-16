class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.read =false;
    }
}

const booksData = [
    new Book(1, "BOOK"),
    new Book(2, "BOK"),
    new Book(3, "book"),
    new Book(3, "book"),
    new Book(4, "book"),
    new Book(5, "book"),
];

let library = JSON.parse(localStorage.getItem(library)) || [];


document.addEventListener("loaded", () => {
    renderBooks();
    renderLibrary();
});

function addToLibrary(id) {
    const book = booksData.find(b => b.id === id);
    if (book && !library.some(b => b.id === id)) {
        library.push(book);
        saveLibrary();
        renderLibrary();
    }
}

function removeFromLibrary(id) {
    library = library.filter(book => book.id !== id);
    saveLibrary();
    renderLibrary();
}

function toggleRead(id) {
    library = library
}



















