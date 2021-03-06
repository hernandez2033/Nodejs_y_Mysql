//aca definimos los metodos de autenticacion 

const passport = require('passport'); //podemos definir que tipo de actenticasion requerimos
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

//para el login
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    /*console.log(req.body);//para valiar si estamos resibiendo estos datos
    console.log(username);//para valiar si estamos resibiendo estos datos
    console.log(password);//para valiar si estamos resibiendo estos datos
    */
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
   if (rows.length > 0){//si la longitud de rows es mayor que cero significa que encontro un usuario
        const user = rows[0];//del arrays resivido mandar la pocicion inical y guradarla en user
        //proceso de comparacion, entre la clave ingresada y la que existe en la base de datos
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success', 'Welcome ' + user.username));
        }else{
            done(null, false, req.flash('message','Incorrect Password'));
        }
    } else { //si no encontro ningun usuario
        return done(null, false, req.flash('message','The Username does not exists'));
    }
    
}));

//para registrar nuevo usuario
passport.use('local.signup', new LocalStrategy({
    //aca se caprturan los datos que se extraen de formulario signup
    usernameField: 'username', //username es el mismo nombre que tiene en la propedad name del formulario
    passwordField: 'password',
    passReqToCallback: true //con esto extraemos los demas daros adicionales del formulario

}, async(req, username, password, done) => {
    const { fullname } = req.body; //aca indicamos que de los parametro extraido solo queremos el fullname
    const newUser = {
        username, //al estar estos definidos de manera directa no es necesario extraerlos desde req.body
        password,
        fullname
    };
    newUser.password = await helpers.encriptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM  users where id = ?', [id]);
    done(null, rows[0]);
});