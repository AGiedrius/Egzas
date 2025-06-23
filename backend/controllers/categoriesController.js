// Kategorijų logika
const categoryModel = require('../models/categoryModel');

exports.getAllCategories = async (req, res) => {
    try {
        const kategorijos = await categoryModel.gautiVisas();
        res.json(kategorijos);
    } catch (err) {
        res.status(500).json({ message: 'Klaida gaunant kategorijas' });
    }
};

exports.createCategory = async (req, res) => {
    // Validacija ir kūrimas
    res.json({ message: 'Kategorija sukurta (pavyzdys)' });
};

exports.updateCategory = async (req, res) => {
    // Redagavimas
    res.json({ message: 'Kategorija atnaujinta (pavyzdys)' });
};

exports.deleteCategory = async (req, res) => {
    // Šalinimas
    res.json({ message: 'Kategorija ištrinta (pavyzdys)' });
};
