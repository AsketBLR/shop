const md5 = require('md5');
const User = require('../entity/User.js');

exports.authMiddleware = (req, res, next) => {
   if(req.session.user){
      res.locals.currentUser = req.session.user;
   }
   next();
}

exports.login = async (req, res) =>{
   return  res.render('shop/login', {layout: null});
}

exports.postLogin = async (req, res) => {
   const {email, password} = req.body;
   if (email && password) {
      const user = await User.findOne({where: {email}})
         if (md5(password) === user.password) {
            req.session.user = user
            return res.redirect('/shop')
         }
   }
   return  res.render('shop/login', {layout: null});
}

exports.logout = async (req, res) => {
   req.session.destroy();
   return res.redirect('/shop')
}