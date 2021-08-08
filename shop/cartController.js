const User = require("../entity/User.js");
const Product = require("../entity/Product.js");
const Order = require("../entity/Order.js");
const _ = require('lodash');
exports.add = async (req, res, next) => {
    const authUser = await User.findByPk(req.session.user.id);
    const cart = authUser.cart ? authUser.cart : [];
    const product = await Product.findByPk(parseInt(req.body.id));
    if (cart.some(i => i.product.id === product.id)) {
        cart.find(e => e.product.id === product.id).count++;
    } else {
        cart.push({
            product,
            count: parseInt(req.body.count)
        })
    }
    authUser.cart = cart
    await authUser.save();
    res.json(authUser.cart);
}

exports.getCart = async (req, res) => {

    const authUser = await User.findByPk(req.session.user.id);
    return res.render('shop/cart', {
        title: 'Корзина покупок',
        cart: authUser.cart
    })
}

exports.remove = async (req, res) => {
    const authUser = await User.findByPk(req.session.user.id);
    const cart = authUser.cart.filter(item => item.product.id !== req.body.id);
    authUser.cart = cart;
    await authUser.save();
    res.json(cart);

}

exports.change = async (req, res) => {
    const {id, count} = req.body;
    const authUser = await User.findByPk(req.session.user.id);
    const cart = authUser.cart;
    const item = cart.find(i => i.product.id === id);
    item.count = count;
    authUser.cart = cart;
    await authUser.save();
    res.json({cart, item})
}

exports.order = async (req, res) => {
    const authUser = await User.findByPk(102);
    const cart = authUser.cart;
    const ids = req.body.id.map(n => parseInt(n));
    const counts = req.body.count.map(n => parseInt(n));
    const data = _.zip(ids, counts);
    const products = cart.map(item => {
        return {
            id: item.product.id,
            price: item.product.price,
            count: data.find(d => item.product.id === d[0])[1]
        };
    })
    const total = products.reduce((accumulator, product)=>{
         return accumulator + product.price * product.count;
    },0)
    const order = await Order.create({
        status: Order.statuses.new,
        total: total,
        products: products
    })
    await order.save()

}