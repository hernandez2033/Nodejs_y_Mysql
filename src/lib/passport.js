//aca definimos los metodos de autenticacion 

const passport = require('passport');//podemos definir que tipo de actenticasion requerimos
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');
passport.use('local.signup', new LocalStrategy({
    //aca se caprturan los datos que se extraen de formulario signup
    usernameField: 'username',//username es el mismo nombre que tiene en la propedad name del formulario
    passwordField: 'password',
    passReqToCallback: true//con esto extraemos los demas daros adicionales del formulario

}, async(req, username, password, done) => {
    const { fullname } = req.body;//aca indicamos que de los parametro extraido solo queremos el fullname
    const newUser = {
        username,//al estar estos definidos de manera directa no es necesario extraerlos desde req.body
        password,
        fullname
    };
    newUser.password = await helpers.encriptPassword(password);

    const result = await pool.query('INSET INTO users SET ?', [newUser]);
    console.log(result);
}));