const md5 = require('md5');
const User = require('../entity/User.js');


exports.authMiddleware = (req, res, next) => {
    if(!req.session.user && (!req.path.includes('/login'))){
        return res.redirect('/admin/login');
    }
    if (!req.path.includes('/login')) {
        res.locals.layout = 'admin/layout';
    }
    res.locals.activeMenuItem = req.path;
    if(req.session.user){
        res.locals.currentUser = req.session.user;
    }
    next();
}


exports.getLogin = async (req, res, next) => {
    res.render('admin/login', {layout: null});
}

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        const user = await User.findOne({where: {email}})
        if (user && (user.role !== User.roles.customer)) {
            if (md5(password) === user.password) {
                req.session.user = user
                return res.redirect('/admin')
            }
        }
    }
    res.render('admin/login', {layout: null});
}


exports.logout = async (req, res, next) => {
    req.session.destroy();
    res.redirect('/admin/login')
}
