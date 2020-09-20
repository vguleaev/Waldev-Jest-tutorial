const booksProvider = require('./books-provider');
const emailService = require('./email.service');

function searchBooks(searchText) {
  const books = booksProvider.getBooks();

  const filteredBooks = books.filter((book) => book.title.includes(searchText));

  if (!filteredBooks.length) {
    emailService.sendMissingBookEmail();
  }

  const formattedBooks = filteredBooks.map((book) => {
    return {
      _id: book._id,
      title: _formatBookName(book),
      categories: book.categories,
      authors: book.authors,
      price: book.price,
      ordered: book.ordered
    };
  });

  return formattedBooks;
}

function _formatBookName(book) {
  const { title, publishedDate } = book;
  if (!publishedDate) {
    return title;
  }

  const yearOfPublish = new Date(publishedDate).getFullYear();

  return `${title} ${yearOfPublish}`;
}

function getMostPopularBook() {
  const books = booksProvider.getBooks();

  return books.reduce((a, b) => (a.ordered > b.ordered ? a : b));
}

function calculateDiscount(bookId) {
  const book = booksProvider.getBooks().find((book) => book._id === bookId);
  if (!book) {
    throw new Error('Book with such id not found');
  }

  const discountInPercents = 20;
  const discount = (book.price * discountInPercents) / 100;

  return book.price - discount;
}

function calculateDiscountAsync(bookId) {
  const price = calculateDiscount(bookId);

  return new Promise((resolve) => {
    setTimeout(() => resolve(price), 1000);
  });
}

module.exports = {
  searchBooks,
  getMostPopularBook,
  calculateDiscount,
  calculateDiscountAsync
};
