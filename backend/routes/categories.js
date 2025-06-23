const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const auth = require('../middleware/auth');

// Gauti visas kategorijas
router.get('/', categoriesController.getAllCategories);
// Pridėti naują kategoriją (tik admin)
router.post('/', auth.admin, categoriesController.createCategory);
// Redaguoti kategoriją (tik admin)
router.put('/:id', auth.admin, categoriesController.updateCategory);
// Ištrinti kategoriją (tik admin)
router.delete('/:id', auth.admin, categoriesController.deleteCategory);

module.exports = router;
