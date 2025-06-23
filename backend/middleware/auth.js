// Paprastas autentifikacijos middleware (pavyzdys)
exports.admin = (req, res, next) => {
    // Tikrinama ar vartotojas yra admin (čia tik pavyzdys, realiai reikėtų JWT)
    // req.user.role === 'admin'
    next();
};
