const Product = require('../entity/Product.js');
const _ = require('lodash');

exports.getProducts = async (req, res, next) => {
    const limit = 20

    const page = req.query.page ? +req.query.page : 1;
    const products = await Product.findAndCountAll({limit: limit, offset: (page - 1) * limit});
    products.rows.forEach(product => {
        product.images = _.take(product.images, 3)
    })
    const pagination = {
        page: page,
        pageCount: Math.ceil(products.count / limit),
    }
    res.render('admin/products/index', {products: products.rows, pagination, title: 'Список продуктов'})
}

exports.deleteProduct = async (req, res, next) => {
    const id = +req.params.id;
    const product = await Product.findByPk(id);
    await product.destroy();
    res.redirect('/admin/products');
}