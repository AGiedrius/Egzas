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

// Dalinis vartotojo atnaujinimas pagal id
exports.update = async (id, fields) => {
    const allowed = ['vardas', 'pavarde', 'gim_data', 'el_pastas', 'patvirtintas', 'blokuotas'];
    const updates = [];
    const params = [];
    allowed.forEach(k => {
        if (fields[k] !== undefined) {
            updates.push(`${k} = $${updates.length + 1}`);
            params.push(fields[k]);
        }
    });
    if (!updates.length) throw new Error('Nėra ką atnaujinti');
    params.push(id);
    const sql = `UPDATE vartotojai SET ${updates.join(', ')} WHERE id = $${params.length} RETURNING *`;
    const result = await db.query(sql, params);
    return result.rows[0];
};

// Paieška ir filtravimas su trgm
exports.search = async (query, patvirtintas, blokuotas) => {
    let sql = `SELECT * FROM vartotojai WHERE 1=1`;
    const params = [];
    if (query) {
        sql += ` AND (` +
            `similarity(vardas, $${params.length + 1}) > 0.2 OR ` +
            `similarity(pavarde, $${params.length + 1}) > 0.2 OR ` +
            `similarity(el_pastas, $${params.length + 1}) > 0.2)`;
        params.push(query);
    }
    if (patvirtintas === 'true') {
        sql += ` AND patvirtintas = true`;
    } else if (patvirtintas === 'false') {
        sql += ` AND patvirtintas = false`;
    }
    if (blokuotas === 'true') {
        sql += ` AND blokuotas = true`;
    } else if (blokuotas === 'false') {
        sql += ` AND blokuotas = false`;
    }
    sql += ` ORDER BY id DESC`;
    const result = await db.query(sql, params);
    return result.rows;
};
