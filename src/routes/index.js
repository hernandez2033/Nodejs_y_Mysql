const express = require('express');
const router = express.Router();

    router.get('/', (req, res) =>{
    res.render('index');//renderisamos a index.js que esta alojado en views
    
});
module.exports = router;