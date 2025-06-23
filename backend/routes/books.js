const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const auth = require('../middleware/auth');

// Gauti visas knygas
router.get('/', booksController.getAllBooks);
// Pridėti naują knygą (tik admin)
router.post('/', auth.admin, booksController.createBook);
// Redaguoti knygą (tik admin)
router.put('/:id', auth.admin, booksController.updateBook);
// Ištrinti knygą (tik admin)
router.delete('/:id', auth.admin, booksController.deleteBook);

module.exports = router;
