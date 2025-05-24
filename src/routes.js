const { addBook, getBooks, updateBook, deleteBook } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooks, // untuk semua buku
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooks, // untuk buku berdasarkan id
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook,
  },
];

module.exports = routes;
