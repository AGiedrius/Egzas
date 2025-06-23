// Rezervacijų logika
const reservationModel = require('../models/reservationModel');

exports.getAllReservations = async (req, res) => {
    try {
        const rezervacijos = await reservationModel.gautiVisas();
        res.json(rezervacijos);
    } catch (err) {
        res.status(500).json({ message: 'Klaida gaunant rezervacijas' });
    }
};

exports.createReservation = async (req, res) => {
    // Validacija ir kūrimas
    res.json({ message: 'Rezervacija sukurta (pavyzdys)' });
};

exports.extendReservation = async (req, res) => {
    // Pratęsimas
    res.json({ message: 'Rezervacija pratęsta (pavyzdys)' });
};

exports.returnBook = async (req, res) => {
    // Grąžinimas
    res.json({ message: 'Knyga grąžinta (pavyzdys)' });
};
