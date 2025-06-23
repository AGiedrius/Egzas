// Vartotojų logika
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const jwt = require('jsonwebtoken');

// Registracija
exports.register = async (req, res) => {
    try {
        const { vardas, pavarde, gim_data, el_pastas, slaptazodis } = req.body;
        if (!vardas || !pavarde || !gim_data || !el_pastas || !slaptazodis) {
            return res.status(400).json({ message: 'Visi laukai privalomi' });
        }
        // Patikriname ar el. paštas jau registruotas
        const jauYra = await userModel.gautiPagalElPastas(el_pastas);
        if (jauYra) {
            return res.status(409).json({ message: 'Toks el. paštas jau registruotas' });
        }
        const hash = await bcrypt.hash(slaptazodis, 10);
        const naujasVartotojas = await userModel.sukurti({ vardas, pavarde, gim_data, el_pastas, slaptazodis: hash });
        res.status(201).json(naujasVartotojas);
    } catch (err) {
        res.status(500).json({ message: 'Klaida registruojant vartotoją' });
    }
};

// Prisijungimas
exports.login = async (req, res) => {
    try {
        const { el_pastas, slaptazodis } = req.body;
        if (!el_pastas || !slaptazodis) {
            return res.status(400).json({ message: 'Įveskite el. paštą ir slaptažodį' });
        }
        const vartotojas = await userModel.gautiPagalElPastas(el_pastas);
        if (!vartotojas) {
            return res.status(401).json({ message: 'Neteisingas el. paštas arba slaptažodis' });
        }
        const atitinka = await bcrypt.compare(slaptazodis, vartotojas.passworld);
        if (!atitinka) {
            return res.status(401).json({ message: 'Neteisingas el. paštas arba slaptažodis' });
        }
        // Sukuriam JWT tokeną
        const token = jwt.sign({ id: vartotojas.id, role: vartotojas.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.json({ token, vartotojas: { id: vartotojas.id, vardas: vartotojas.vardas, role: vartotojas.role } });
    } catch (err) {
        res.status(500).json({ message: 'Klaida jungiantis' });
    }
};

// Gauti visus vartotojus
exports.getAllUsers = async (req, res) => {
    try {
        const vartotojai = await userModel.gautiVisus();
        res.json(vartotojai);
    } catch (err) {
        res.status(500).json({ message: 'Klaida gaunant vartotojus' });
    }
};

// Paieška ir filtravimas
exports.search = async (req, res) => {
    try {
        const { query = '', patvirtintas, blokuotas } = req.query;
        const vartotojai = await userModel.search(query, patvirtintas, blokuotas);
        res.json(vartotojai);
    } catch (err) {
        res.status(500).json({ message: 'Klaida ieškant vartotojų' });
    }
};

// Gauti prisijungusio vartotojo info
exports.me = async (req, res) => {
    try {
        // req.user turi būti užpildytas jwt middleware
        if (!req.user) return res.status(401).json({ message: 'Neautorizuota' });
        // Galima papildomai gauti pilną info iš DB, jei reikia
        // const vartotojas = await userModel.gautiPagalId(req.user.id);
        // res.json(vartotojas);
        res.json(req.user);
    } catch (err) {
        res.status(500).json({ message: 'Serverio klaida' });
    }
};

// Redaguoti vartotoją
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { vardas, pavarde, gim_data, el_pastas, patvirtintas, blokuotas } = req.body;
        const updated = await userModel.update(id, { vardas, pavarde, gim_data, el_pastas, patvirtintas, blokuotas });
        res.json(updated);
    } catch (err) {
        console.error('Vartotojo redagavimo klaida:', err);
        res.status(500).json({ message: err.message || 'Klaida redaguojant vartotoją' });
    }
};
