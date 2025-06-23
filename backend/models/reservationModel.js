// Rezervacijų modelis: DB užklausos
const db = require('../db');

exports.gautiVisas = async () => {
    const result = await db.query('SELECT * FROM rezervacijos');
    return result.rows;
};
// Čia bus daugiau funkcijų (sukurti, pratęsti, grąžinti)
