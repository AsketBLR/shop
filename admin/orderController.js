const Order = require('../entity/Order.js');
const _ = require('lodash');

exports.getOrders = async (req, res, next) => {
    const limit = 20
    const page = req.query.page ? +req.query.page : 1;
    const orders = await Order.findAndCountAll({
        include: ["user"],
        limit: limit,
        offset: (page - 1) * limit,
    });
    orders.rows.forEach(product => {
        orders.images = _.take(orders.images, 3)
    })
    const pagination = {
        page: page,
        pageCount: Math.ceil(orders.count / limit),
    }
    res.render('admin/orders/index', {orders: orders.rows, pagination, title: 'Список заказов'})
}

