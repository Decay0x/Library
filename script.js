let myLibrary = [];
let counter = 1;
const booksContainer = document.querySelector('.booksContainer');
const dialog = document.getElementById('dialog');
const form = document.querySelector('form');
const addBtn = document.getElementById('addBtn');

const Book = function (id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

const addBookToLibrary = () => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read input[type = radio]:checked');
  const id = `id_${counter}`;
  const newBook = new Book(
    id,
    title.value,
    author.value,
    pages.value,
    read.value
  );
  myLibrary.push(newBook);
  displayBooks(newBook);
  counter++;
};

addBtn.addEventListener('click', () => {
  dialog.showModal();
});

const toggleRead = (bookInput) => {
  myLibrary.forEach((book) => {
    if (book.id === bookInput) {
      book.read = !book.read;
    }
  });
};
const displayBooks = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  for (const key in book) {
    switch (key) {
      case 'title':
        const title = document.createElement('h4');
        title.textContent = `${key}: ${book[key]}`;
        bookDiv.append(title);
        break;
      case 'author':
        const author = document.createElement('p');
        author.textContent = `${key}: ${book[key]}`;
        bookDiv.append(author);
        break;
      case 'pages':
        const pages = document.createElement('p');
        pages.textContent = `${key}: ${book[key]}`;
        bookDiv.append(pages);
        break;
      case 'read':
        const inputDiv = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        label.style.display = 'inline-block';
        input.style.display = 'inline-block';
        label.textContent = 'Read : ';
        input.setAttribute('id', `${book.id}`);
        label.setAttribute('for', `${book.id}`);
        input.setAttribute('type', 'radio');
        input.addEventListener('click', () => {
          toggleRead(input.id);
          input.checked = book.read;
          input.checked === true
            ? input.setAttribute('checked', true)
            : input.removeAttribute('checked', true);
        });
        input.setAttribute('name', `${book.id}`);
        inputDiv.style.display = 'flex';
        inputDiv.style.alignItems = 'center';
        inputDiv.append(label, input);
        book.read === 'yes'
          ? input.setAttribute('checked', true)
          : input.removeAttribute('checked', true);
        bookDiv.append(inputDiv);
        bookDiv.setAttribute('id', book.id);
        break;
    }
  }
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('closeBtn');
  closeBtn.textContent = 'X';
  closeBtn.addEventListener('click', () => {
    deleteBook(book);
  });
  bookDiv.append(closeBtn);
  booksContainer.append(bookDiv);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  dialog.close();
});

const deleteBook = (book) => {
  const currentId = book.id;
  myLibrary = myLibrary.filter((book) => book.id !== currentId);
  document.getElementById(currentId).remove();
};
