// Paprastas Express serveris
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sveiki atvykę į bibliotekos backend!');
});

// Vartotojų maršrutai (registracija, prisijungimas, sąrašas)
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveris veikia http://localhost:${PORT}`);
});
