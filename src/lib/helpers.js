//en este apartado encriptamos la contraseña
const bcrypt = require('bcryptjs');

const helpers = {};
//cuando nos registremos
helpers.encriptPassword = async (password) => {
    const salt = await bcrypt.getSalt('10'); //entre mas veses se ejecute el algoridmo mas segura sera pero lleva mas tiempo 10 es aseptable
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

//para el logeo 
helpers.matchPassword = async (password, savedPasword) => {
    try{
        await bcrypt.compare(password, savedPasword);
    } catch(e) {
        console.log(e);
    }
};
module.exports = helpers;