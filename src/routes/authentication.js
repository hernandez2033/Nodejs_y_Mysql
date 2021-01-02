//para definir otras url 
const express = require('express');
const router = express.Router();

const passport = require('passport');
//creamos la ruta a signup que esta ubicada en /views/auth/signup
//aca mostramos el formulario
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});
//aca solicitamos el formulario 
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile', //si la validacion es correcta direccionara a profile
    failureRedirect: '/signup', //si la validacion es incorrecta redireciona al formulario signup
    failureFlash: true
}));

//integramos la ruta al singnin
router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile', //si el login es correcto que redireccione a profile
        failureRedirect: '/signin', //si el login falla que redirecione a signin
        failureFlash: true
    })(req, res);
});

router.get('/profile', (req, res) => {
    res.send('this is your profile');
});

module.exports = router;