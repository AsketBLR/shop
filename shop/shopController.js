const Product = require('../entity/Product.js');
const _ = require('lodash');


exports.lastProductMiddleware = async (req, res, next) => {
    if(req.path === '/'){
        res.locals.lastProducts =await Product.findAll({limit:3, order: [ ['updatedAt', 'DESC']]})
    }
    next();
};

exports.shop = async (req, res, next) =>{
    const products = await Product.findAll({limit:9});
    let brands = (await Product.findAll({attributes: ['brand']})).map(p=>p.brand);
    brands = _.uniq(brands).sort();
    res.render('shop/index', {title: 'Shop', brands, products})
}

