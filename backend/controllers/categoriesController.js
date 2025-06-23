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
    try {
        const { pavadinimas, aprasymas } = req.body;
        if (!pavadinimas) return res.status(400).json({ message: 'Pavadinimas privalomas' });
        const kategorija = await categoryModel.create({ pavadinimas, aprasymas });
        res.status(201).json(kategorija);
    } catch (err) {
        console.error('Kategorijos kūrimo klaida:', err);
        res.status(500).json({ message: err.message || 'Serverio klaida' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { pavadinimas, aprasymas } = req.body;
        if (!pavadinimas) return res.status(400).json({ message: 'Pavadinimas privalomas' });
        const kategorija = await categoryModel.update(id, { pavadinimas, aprasymas });
        res.json(kategorija);
    } catch (err) {
        console.error('Kategorijos atnaujinimo klaida:', err);
        res.status(500).json({ message: err.message || 'Serverio klaida' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.deleteById(id);
        res.json({ message: 'Kategorija ištrinta' });
    } catch (err) {
        console.error('Kategorijos trynimo klaida:', err);
        res.status(500).json({ message: err.message || 'Serverio klaida' });
    }
};
