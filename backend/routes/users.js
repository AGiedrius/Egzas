const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

// Registracija
router.post('/register', usersController.register);
// Prisijungimas
router.post('/login', usersController.login);
// Gauti visus vartotojus (tik admin)
router.get('/', auth.admin, usersController.getAllUsers);

module.exports = router;
