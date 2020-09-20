const bookService = require('../src/book.service');
const booksProvider = require('../src/books-provider');
const emailService = require('../src/email.service');

describe('searchBooks', () => {
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

    it('should concatenate title with year of published date', () => {
      const books = bookService.searchBooks('Test');
      expect(books[0].title).toBe('Test book 2009');
    });

    it('should not send email', () => {
      bookService.searchBooks('Test');
      expect(emailService.sendMissingBookEmail).not.toHaveBeenCalled();
    });
  });

  describe('when zero books match search text', () => {
    beforeEach(() => {
      booksProvider.getBooks = jest.fn(() => [
        {
          _id: 1,
          title: 'Another book'
        }
      ]);
      emailService.sendMissingBookEmail = jest.fn();
    });

    it('should return 0 book', () => {
      const books = bookService.searchBooks('Test');
      expect(books.length).toBe(0);
    });

    it('should send email', () => {
      bookService.searchBooks('Test');
      expect(emailService.sendMissingBookEmail).toHaveBeenCalled();
    });
  });
});

describe('getMostPopularBook', () => {
  describe('when two books are given', () => {
    beforeEach(() => {
      booksProvider.getBooks = jest.fn(() => [
        {
          _id: 1,
          ordered: 100
        },
        {
          _id: 2,
          ordered: 50
        }
      ]);
    });

    it('should return book with highest ordered count', () => {
      const book = bookService.getMostPopularBook();
      expect(book._id).toBe(1);
    });
  });
});

describe('calculateDiscount', () => {
  describe('when book is given with id', () => {
    beforeEach(() => {
      booksProvider.getBooks = jest.fn(() => [
        {
          _id: 1,
          price: 100
        }
      ]);
    });

    it('should return price with 20% discount', () => {
      const price = bookService.calculateDiscount(1);
      expect(price).toBe(80);
    });
  });

  describe('when book with given id not found', () => {
    beforeEach(() => {
      booksProvider.getBooks = jest.fn(() => []);
    });

    it('should throw an error', () => {
      expect(() => bookService.calculateDiscount(1)).toThrow('Book with such id not found');
    });
  });
});

describe('calculateDiscountAsync', () => {
  describe('when book is given with id', () => {
    beforeEach(() => {
      booksProvider.getBooks = jest.fn(() => [
        {
          _id: 1,
          price: 100
        }
      ]);
    });

    it('should return price with 20% discount', async () => {
      const price = await bookService.calculateDiscountAsync(1);
      expect(price).toBe(80);
    });
  });

  describe('when book with given id not found', () => {
    beforeEach(() => {
      booksProvider.getBooks = jest.fn(() => []);
    });

    it('should throw an error', () => {
      expect(async () => await bookService.calculateDiscountAsync(1)).rejects.toThrow('Book with such id not found');
    });
  });
});
