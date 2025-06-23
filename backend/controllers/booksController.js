// Knygų logika
const bookModel = require('../models/bookModel');

exports.getAllBooks = async (req, res) => {
    try {
        const knygos = await bookModel.gautiVisas();
        res.json(knygos);
    } catch (err) {
        res.status(500).json({ message: 'Klaida gaunant knygas' });
    }
};

exports.createBook = async (req, res) => {
    // Validacija ir kūrimas
    res.json({ message: 'Knyga sukurta (pavyzdys)' });
};

exports.updateBook = async (req, res) => {
    // Redagavimas
    res.json({ message: 'Knyga atnaujinta (pavyzdys)' });
};

exports.deleteBook = async (req, res) => {
    // Šalinimas
    res.json({ message: 'Knyga ištrinta (pavyzdys)' });
};
