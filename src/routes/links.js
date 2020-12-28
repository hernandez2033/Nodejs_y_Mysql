const express = require('express');
//const { route } = require('.');

const router = express.Router();

const pool = require('../database');//para regresar a directorio anterior o subir de nivel anteponemos ../

router.get('/add', (req, res) => {
    res.send('Form');
});

module.exports = router;