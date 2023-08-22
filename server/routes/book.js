const express = require('express')
const bookController = require('../controller/book')

const router = express.Router()

router
    .get('/',bookController.getBooks)
    .get('/:id',bookController.getBook)
    .post('/',bookController.createBook)
    .patch('/:id',bookController.updateBook)
    .delete('/:id',bookController.deleteBook)


exports.router = router