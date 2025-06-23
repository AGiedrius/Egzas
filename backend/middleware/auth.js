const jwt = require('jsonwebtoken');

// JWT autentifikacija
exports.jwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Tokenas nepridėtas' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch {
        return res.status(401).json({ message: 'Netinkamas arba pasenęs tokenas' });
    }
};

// Paprastas autentifikacijos middleware (pavyzdys)
exports.admin = (req, res, next) => {
    // Tikrinama ar vartotojas yra admin (čia tik pavyzdys, realiai reikėtų JWT)
    // req.user.role === 'admin'
    next();
};
