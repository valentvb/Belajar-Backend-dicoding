const {nanoid} = require ('nanoid');
const bookshelf = require ('./books');

// FUNGSI POST
const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  bookshelf.push(newBook);

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  }).code(201);
};


// FUNGSI GET
const getBooks = (request, h) => {
  const { id } = request.params; 
  const { finished, name } = request.query; 

  if (id) {
    // Minta detail buku berdasarkan id
    const book = bookshelf.find((b) => b.id === id);
    if (book) {
      return h.response({
        status: 'success',
        data: {
          book,
        },
      }).code(200);
    }
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  if (finished !== undefined) {
    // Filter buku berdasarkan status finished (1 atau 0)
    const finishedBooks = bookshelf.filter((book) => book.finished === (finished === '1'));
    // Map hanya properti yang diminta (id, name, publisher)
    const books = finishedBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    return h.response({
      status: 'success',
      data: {
        books,
      },
    }).code(200);
  }

  if (name !== undefined) {
    // Filter buku berdasarkan nama mengandung query 'name'
    const filteredBooks = bookshelf.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
    // Map hanya properti yang diminta (id, name, publisher)
    const books = filteredBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    return h.response({
      status: 'success',
      data: {
        books,
      },
    }).code(200);
  }

  // Kalau tidak ada id dan query finished/name, return semua buku (id, name, publisher)
  const books = bookshelf.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return h.response({
    status: 'success',
    data: {
      books,
    },
  }).code(200);
};



//FUNGSI : PUT
//fungsi update buku dengan data buku yang complete
// ====================================================================
const updateBook = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  // Cari index buku berdasarkan id
  const index = bookshelf.findIndex((book) => book.id === id);

  // Validasi: id harus ada di bookshelf
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  // Validasi: harus ada name
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  // Validasi: readPage tidak boleh lebih besar dari pageCount
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  // Kalau semua validasi lolos, update data buku
  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  bookshelf[index] = {
    ...bookshelf[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};


//FUNGSI : DELETE
//fungsi delete buku berdasarkan id
// ====================================================================
const deleteBook = (request, h) => {
  const { id } = request.params;

  // Cari index buku berdasarkan id
  const index = bookshelf.findIndex((book) => book.id === id);

  // Validasi: id harus ada
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  // Kalau lolos validasi, hapus buku
  bookshelf.splice(index, 1);

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};








module.exports = { addBook, getBooks, updateBook, deleteBook };
