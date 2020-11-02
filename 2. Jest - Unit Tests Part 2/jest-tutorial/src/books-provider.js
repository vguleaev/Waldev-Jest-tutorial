function getBooks() {
  console.log('Fetching books from db...');

  return [
    {
      _id: 1,
      title: 'Java Persistence with Hibernate',
      categories: ['Web development'],
      publishedDate: '2006-11-01T00:00:00.000-0700',
      price: 18,
      ordered: 5
    },
    {
      _id: 2,
      title: 'C# in Depth',
      categories: ['Microsoft'],
      publishedDate: '2008-04-01T00:00:00.000-0700',
      price: 35,
      ordered: 11
    },
    {
      _id: 3,
      title: 'Node.js in Action',
      categories: ['Nodejs'],
      publishedDate: '2013-10-15T00:00:00.000-0700',
      price: 15,
      ordered: 25
    }
  ];
}

module.exports = {
  getBooks
};
