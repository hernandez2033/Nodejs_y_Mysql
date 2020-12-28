const express = require('express');
//const { route } = require('.');
const router = express.Router();
//importamos la conexion ala base de datos
const pool = require('../database');//para regresar a directorio anterior o subir de nivel anteponemos ../

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', (req, res) => {
    res.send("resivido");
});
module.exports = router;