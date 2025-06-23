// Knygų modelis: DB užklausos
const db = require('../db');

exports.gautiVisas = async () => {
    const result = await db.query('SELECT * FROM knygos');
    return result.rows;
};
// Čia bus daugiau funkcijų (sukurti, redaguoti, trinti)
