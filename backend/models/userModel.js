// Vartotojų modelis: DB užklausos
const db = require('../db');

exports.sukurti = async ({ vardas, pavarde, gim_data, el_pastas, slaptazodis }) => {
    const result = await db.query(
        'INSERT INTO vartotojai (vardas, pavarde, gim_data, el_pastas, passworld) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [vardas, pavarde, gim_data, el_pastas, slaptazodis]
    );
    return result.rows[0];
};

exports.gautiVisus = async () => {
    const result = await db.query('SELECT * FROM vartotojai');
    return result.rows;
};

// Gauti vartotoją pagal el. paštą
exports.gautiPagalElPastas = async (el_pastas) => {
    const result = await db.query('SELECT * FROM vartotojai WHERE el_pastas = $1', [el_pastas]);
    return result.rows[0];
};
