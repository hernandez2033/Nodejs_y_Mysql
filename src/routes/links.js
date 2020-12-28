const express = require('express');
//const { route } = require('.');
const router = express.Router();
//importamos la conexion ala base de datos
const pool = require('../database');//para regresar a directorio anterior o subir de nivel anteponemos ../

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    //destructuri que se aplica ya en las nuevas verciones de javaScript
//se lee de req.body solo necesito title, url, description
    const {title, url, description } = req.body;
    //este objeto se crea solo por que en este ejemplo se requiere
    const newlink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newlink]);
    //console.log(newlink);
    res.send("enviados");
});

module.exports = router;