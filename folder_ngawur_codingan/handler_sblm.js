const {nanoid} = require ('nanoid');
const bookshelf = require ('./src/books');

// FUNGSI POST
//nambahin buku dengan data yang komplete
// ====================================================================
const addBookWithCompleteData = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newBook = { 
        id,
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading, 
        createdAt, 
        updateAt 
    };
    bookshelf.push(newBook);

    const isSuccess = bookshelf.filter((book) => book.id === id). length > 0;

    if(isSuccess){
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        }).code(201);
    }

    return h.respone({
        status:'fail',
        message: 'Buku gagal ditambahkan',
    }).code(500);
};

//nambahin buku yang sudah dibaca
// ====================================================================
const addBookFinishedReading = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage } = request.payload;

    const id = nanoid(16);
    const finished = readPage === pageCount;
    const reading = false; // karena sudah selesai dibaca
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

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
    const isSuccess = bookshelf.find((book) => book.id === id);

    if (isSuccess) {
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        }).code(201);
    }

    return h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    }).code(500);
};

//FUNGSI ERROR : nambahin buku tanpa nama buku
// ====================================================================
const addBookWithoutName = (request, h) => {
  const { year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  return h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku. Mohon isi nama buku',
  }).code(400);
};

//FUNGSI ERROR : nambahin halaman buku yang dibaca lebih dari jumlah halaman buku
// ====================================================================
const addBookWithPageMoreThanPageCount = (request, h) => {
    const { name, year ,author, summary, publisher, pageCount, readPage, reading } =request.payload;

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }
};

// FUNGSI GET
//get semua buku
// ====================================================================
const getAllBooks = () => {
    const books = bookshelf.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    return {
        status: 'success',
        data: {
            books,
        },
    };
};

//get detail buku berdasarkan id
// ====================================================================
const getBooksWithId = (request, h) => {
    const { id } = request.params;

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
};

//get detail buku berdasarkan yang sudah dibaca
// ====================================================================
const getDetailFinishBook = (request, h) => {
  const finishedBooks = bookshelf.filter((book) => book.finished === true);

  return h.response({
    status: 'success',
    data: {
      books: finishedBooks,
    },
  }).code(200);
};

//FUNGSI ERROR : get detail buku jika id invalid
// ====================================================================
const getDetailBookInvalidId = (request, h) => {
  const { id } = request.params;

  const book = bookshelf.find((b) => b.id === id);

  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book,
    },
  }).code(200);
};

//FUNGSI : PUT
//fungsi update buku dengan data buku yang complete
// ====================================================================
const updateBookWithCompleteData = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = bookshelf.findIndex((book) => book.id === id);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  // langsung update data tanpa validasi
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

//FUNGSI ERROR : update buku tanpa nama buku
// ====================================================================
const updateBookWithoutName = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }
};

//FUNGSI ERROR : update buku dengan halaman lebih dari halaman buku yang ada
// ====================================================================
const updateBookWithPageReadMoreThanPageCount = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading} =  request.payload;

    if (readPage > pageCount) {
        return h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    } 
};

//FUNGSI ERROR : update buku dengan invalid id
// ====================================================================
const updateBookWithInvalidId = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  // Cari index buku berdasarkan id
  const index = bookshelf.findIndex((book) => book.id === id);

  // Kalau buku dengan id tersebut gak ditemukan
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);  
  }
};


//FUNGSI : DELETE
//fungsi delete buku berdasarkan id
// ====================================================================
const deleteBookWithId = (request, h) => {
    const { id } = request.params;

    const index = bookshelf.findIndex((book) => book.id === id );

    if(index !== -1){
        bookshelf.splice(index, 1);
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }
};

//fungsi delete finished book
// ====================================================================
const deleteFinishedBook = (request, h) => {
    const { id } = request.params;

    const index = bookshelf.findIndex((book) => book.id === id);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    }

    const book = bookshelf[index];

    if (!book.finished) {
        return h.response({
            status: 'fail',
            message: 'The book should be not found',
        }).code(404); 
    }

    bookshelf.splice(index, 1);

    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200);
};

//FUNGSI ERROR : fungsi delete buku dengan id yang salah
// ====================================================================
const deleteBookWithInvalidId = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  // Cari index buku berdasarkan id
  const index = bookshelf.findIndex((book) => book.id === id);

  // Kalau buku dengan id tersebut gak ditemukan
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);  
  }
};

//FUNGSI : POST
//fungsi menambahkan reading dan finished book
// ====================================================================
// const addReadingAndFinishedBook = (request, h) => {
//   const { pageCount, readPage, reading } = request.payload;

//   const finished = readPage === pageCount;

//   return h.response({
//     status: 'success',
//     message: 'Status reading dan finished berhasil dihitung',
//     data: {
//       reading: reading === true,
//       finished,
//     },
//   }).code(200);
// };






module.exports = { addBookWithCompleteData, addBookFinishedReading, addBookWithoutName, addBookWithPageMoreThanPageCount, getAllBooks, getBooksWithId, getDetailFinishBook, getDetailBookInvalidId, updateBookWithCompleteData, updateBookWithoutName, updateBookWithPageReadMoreThanPageCount, updateBookWithInvalidId, deleteBookWithId, deleteFinishedBook, deleteBookWithInvalidId};