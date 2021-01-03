const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const seccion = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

//extrayendo la conexion a la base de datos 
const { database } = require('./keys');
//const passport = require('passport');

//initializations
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    //definimos algunas propiedades
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
//configuranco la cesion 
app.use(seccion({
    secret: 'mysqlnodeseccion', 
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)//aca le pasamos la conexion de la base de datos
}));
app.use(flash());//para poder enviar mensajes emergentes
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//si el servidor da una respuest en consola GET / - - ms - - es por que as declarado mal json y no json()
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash( 'message');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes/index.js'));//requerimos index.js de la ruta ./routes/
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));


//Public 
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});