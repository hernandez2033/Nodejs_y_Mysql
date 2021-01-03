//para definir otras url 
const express = require('express');
const router = express.Router();

const passport = require('passport');
//aca importamos el metodo creado en auth
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');//este metodo es para proteger las rutas

//creamos la ruta a signup que esta ubicada en /views/auth/signup
//aca mostramos el formulario
router.get('/signup', isNotLoggedIn, (req, res) => {//le indico con el metodo isNotLoggedIn que si estoy logeado no muestre esta ruta
    res.render('auth/signup');
});
//aca solicitamos el formulario 
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile', //si la validacion es correcta direccionara a profile
    failureRedirect: '/signup', //si la validacion es incorrecta redireciona al formulario signup
    failureFlash: true
}));

//integramos la ruta al singnin
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile', //si el login es correcto que redireccione a profile
        failureRedirect: '/signin', //si el login falla que redirecione a signin
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {//al implementar el metodo isLoggedIn en esta ruta dicha ruta queda protegida 
    res.render('profile');
});

//creando la ruta a Logout
router.get('/logout',(req, res) => {
    //passport ya nos da un metodo para cerrar secion
    req.logOut();
    res.redirect('/signin');//si ya no esta logeado lo direcciona signin
});

module.exports = router;