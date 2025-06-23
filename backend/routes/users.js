const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

// Registracija
router.post('/register', usersController.register);
// Prisijungimas
router.post('/login', usersController.login);
// Gauti prisijungusio vartotojo info
router.get('/me', auth.jwt, usersController.me);
// Paieška ir filtravimas (tik admin)
router.get('/search', auth.admin, usersController.search);
// Gauti visus vartotojus (tik admin)
router.get('/', auth.admin, usersController.getAllUsers);

// Redaguoti vartotoją (tik admin)
router.patch('/:id', auth.admin, usersController.updateUser);

module.exports = router;
