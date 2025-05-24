const { addBookWithCompleteData, addBookFinishedReading, addBookWithoutName, addBookWithPageMoreThanPageCount, getAllBooks, getBooksWithId, getDetailFinishBook, getDetailBookInvalidId, updateBookWithCompleteData, updateBookWithoutName, updateBookWithPageReadMoreThanPageCount, updateBookWithInvalidId, deleteBookWithId, deleteFinishedBook, deleteBookWithInvalidId } = require ('../handler_sblm');

const routes = [
    {
        method: 'POST',
        path:'/books',
        handler: addBookWithCompleteData ,
    },
    {
        method: 'POST',
        path:'/books',
        handler: addBookFinishedReading ,
    },
    {
        method: 'POST',
        path:'/books',
        handler: addBookWithoutName ,
    },
    {
        method: 'POST',
        path:'/books',
        handler: addBookWithPageMoreThanPageCount ,
    },
    {
        method: 'GET',
        path:'/books',
        handler: getAllBooks ,
    },
    {
        method: 'GET',
        path:'/books/{id}',
        handler: getBooksWithId ,
    },
    {
        method: 'GET',
        path:'/books',
        handler: getDetailFinishBook ,
    },
    {
        method: 'GET',
        path:'/books/{id}',
        handler: getDetailBookInvalidId ,
    },
    {
        method: 'PUT',
        path:'/books/{id}',
        handler: updateBookWithCompleteData ,
    },
    {
        method: 'PUT',
        path:'/books/{id}',
        handler: updateBookWithoutName ,
    },
    {
        method: 'PUT',
        path:'/books/{id}',
        handler: updateBookWithPageReadMoreThanPageCount,
    },
    {
        method: 'PUT',
        path:'/books/{id}',
        handler: updateBookWithInvalidId ,
    },
    {
        method: 'DELETE',
        path:'/books/{id}',
       handler: deleteBookWithId ,
    },
    {
        method: 'DELETE',
        path:'/books/{id}',
       handler: deleteFinishedBook ,
    },
    {
        method: 'DELETE',
        path:'/books/{id}',
       handler: deleteBookWithInvalidId ,
    },
    // {
    //     method: 'POST/{id}',
    //     path:'/books',
    //     handler:  ,
    // },



    
    
]

module.exports = routes;