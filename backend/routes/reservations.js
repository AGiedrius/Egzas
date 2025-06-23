const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');
const auth = require('../middleware/auth');

// Gauti visas rezervacijas (admin)
router.get('/', auth.admin, reservationsController.getAllReservations);
// Sukurti rezervaciją (svečias)
router.post('/', reservationsController.createReservation);
// Pratęsti rezervaciją (svečias)
router.put('/:id/pratesti', reservationsController.extendReservation);
// Grąžinti knygą (svečias)
router.put('/:id/grazinti', reservationsController.returnBook);

module.exports = router;
