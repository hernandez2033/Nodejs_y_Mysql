//crearemos un metodo 
module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/signin');//este otro metodo es cuando no estas logeado
    }, isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
};