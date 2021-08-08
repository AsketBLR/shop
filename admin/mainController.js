const _ = require('lodash');
const sequelize = require('../entity/connection.js');
const Product = require('../entity/Product.js');
const User = require('../entity/User.js');
const Order = require('../entity/Order.js');

exports.dashboard = async (req, res, next) => {
    const count = {};
    count.products = await Product.count();
    count.users = await User.count();
    count.orders = await Order.count();
    const lastProducts = await Product.findAll({
        limit: 10,
        order: [ ['id', 'DESC']]
    })
    const lastUsers = await User.findAll({
        include: ["orders"],
        limit: 10,
        order: [ ['createdAt', 'DESC']]
    })
    let ordersData = await Order.findAll({
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('Order.id')), 'count'],
            [sequelize.fn('DATE_FORMAT', sequelize.col('Order.createdAt'), '%Y-%m'), 'date']
        ],
        group: ['date'],
    });
    ordersData = _.take(ordersData, 6);
    const chart = {};
    chart.labels = JSON.stringify(ordersData.map(d => d.getDataValue('date')));
    chart.orders = JSON.stringify(ordersData.map(d => d.getDataValue('count')));
    chart.views = JSON.stringify(ordersData.map(()=>{
        return Math.ceil(Math.random()*200)
    }));
    const processingOrders = await Order.getOrderByStatus(Order.statuses.processing, 8);
    return res.render(
        'admin/index',
        {
            count,
            chart,
            processingOrders,
            lastUsers,
            lastProducts,
            title: 'Dashboard'
        })
}