const express = require('express');
//const { route } = require('.');
const router = express.Router();
//importamos la conexion ala base de datos
const pool = require('../database');//para regresar a directorio anterior o subir de nivel anteponemos ../

router.get('/add', (req, res) => {
    res.render('links/add');
});
//un insert a la base de datos
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
    res.redirect('/links');//aca retorna a la ruta links
});

//un select a la base de datos en especifico a la tabla links

router.get('/', async (req, res) => {//aca se le indica que pinte en la ruta links
    const links = await pool.query('SELECT * FROM links');
    
    res.render('links/list', { links });//redenderizamos a el archivo list.hbs
});

//usandolo el metodo delete

router.get('/delete/:id', async (req, res) =>{
    const { id } = req.params;//desde req.params requiero solo el id 
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

//usando el metodo select para crear la vista editar y rellenar los campos desde la base de datos

router.get('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);//se lee selecciona el id de la tabla links donde el [id] se igual
    //console.log(links[0]);
    res.render('links/edit', {link: links[0]});//redirigeme a la vista edit
});

//haciendo uso del metodo actualizar o update
router.post('/edit/:id', async (req, res)=>{
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newlink = {
        title,
        description,
        url
    };
    console.log(newlink);
    await pool.query('UPDATE links set ? WHERE id = ?', [newlink, id]);
    res.redirect('/links');
});


module.exports = router;