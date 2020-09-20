const bookService = require('../src/book.service');
const booksProvider = require('../src/books-provider');
const emailService = require('../src/email.service');

describe('searchBook', () => {
  describe('when one book matches search text', () => {
    beforeEach(() => {
      booksProvider.getBooks = jest.fn(() => [
        {
          _id: 1,
          title: 'Test book',
          publishedDate: '2009-04-01T00:00:00.000-0700'
        }
      ]);
      emailService.sendMissingBookEmail = jest.fn();
    });

    it('should return 1 book', () => {
      const books = bookService.searchBooks('Test');
      expect(books.length).toBe(1);
    });

    it('should return 1 book', () => {
      const books = bookService.searchBooks('Test');
      expect(books[0].title).toBe('Test book 2009');
    });

    it('should not call send email', () => {
      bookService.searchBooks('Test');
      expect(emailService.sendMissingBookEmail).not.toHaveBeenCalled();
    });
  });

  describe('when zero books match search text', () => {
    beforeEach(() => {
      booksProvider.getBooks = jest.fn(() => [
        {
          _id: 1,
          title: 'Test book'
        }
      ]);
      emailService.sendMissingBookEmail = jest.fn();
    });

    it('should return 0 book', () => {
      const books = bookService.searchBooks('Another');
      expect(books.length).toBe(0);
    });

    it('should call send email', () => {
      bookService.searchBooks('Another');
      expect(emailService.sendMissingBookEmail).toHaveBeenCalled();
    });
  });
});
