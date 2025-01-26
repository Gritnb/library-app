const myLibrary = [{
    title: "Our Mathematical Universe",
    author: "Max Tegmark",
    pages: 432,
    status: "Reading..."
    }, 
    {
    title: "Game of Thrones",
    author: "George R.R. Martin",
    pages: 694,
    status: "Complete"
    }
];

const numberOfBooks = document.querySelector(".book-number");
const cardContainer = document.querySelector(".library-container");

const form = document.querySelector("#user-form");
const dialog = document.querySelector("dialog");
const closeModal = document.querySelector(".close-modal");
const cancelModal = document.querySelector(".cancel-btn");
const confirm = document.querySelector(".confirm-btn");

const newBookButton = document.querySelector(".add-book");

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
}

function clearContainer() {
    cardContainer.innerHTML = "";
}

clearContainer();
//Display the books.
function booksDisplay() {
    clearContainer();
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML =   `<div class="card-text" data-id="${index}">
                                <span class="book-title">${book.title}</span>
                                <div class="author-wrapper">
                                    <p>by</p><span class="book-author">${book.author}</span>
                                </div>
                                <div class="pages-wrapper">
                                    <p>No. Pages: </p><span class="book-pages">${book.pages}</span>
                                </div>
                            </div>
                            <div class="status">
                                <p>Status</p>
                                <div class="card-status ${book.status === "Complete" ? "complete" : "reading"}"
                                data-status=${index}>
                                    <span>${book.status}</span>
                                </div>
                            </div>
                            <div class="book-icons">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                     viewBox="0 0 24 24"
                                     class="utility-icon book-icon">
                                    <title>Favorite</title>
                                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                     viewBox="0 0 24 24"
                                     class="utility-icon book-icon">
                                    <title>Share</title>
                                    <path d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                     viewBox="0 0 24 24"
                                     class="utility-icon book-icon"
                                    id="remove-book"
                                    data-button="${index}">
                                    <title>Delete</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                                </svg>
                            </div>`;
        cardContainer.appendChild(card);
        numberOfBooks.textContent = myLibrary.length;

        /*Remove book module*/
        const removeBook = document.querySelector(`[data-button="${index}"]`);
        removeBook.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            numberOfBooks.textContent = myLibrary.length;
            booksDisplay();
        });

        /*Toggle read status*/
        const toggleStatus = document.querySelector(`[data-status="${index}"]`);
        toggleStatus.addEventListener("click", () => {
            let status = book.status;
            if (status === "Reading...") {
                book.status = "Complete";
                booksDisplay();
            } else if (status ==="Complete") {
                book.status = "Reading...";
                booksDisplay();
            }
        });
    });
};

//Add a new book
newBookButton.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newTitle = document.querySelector("#title-input").value;
    const newAuthor = document.querySelector("#author-input").value;
    const newPages = document.querySelector("#pages-input").value;
    const newStatus = document.querySelector('input[name="status"]:checked').value;

    addBookToLibrary(newTitle, newAuthor, newPages, newStatus);
    booksDisplay();
    dialog.close();
    form.reset();
});

closeModal.addEventListener("click", () => {
    form.reset();
    dialog.close();
});

cancelModal.addEventListener("click", () => {
    form.reset();
    dialog.close();
});

//Display the number of books on screen.
booksDisplay();
