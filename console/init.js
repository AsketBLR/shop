require('dotenv').config({path: '../.env'})
const Product = require("../entity/Product.js");
const User = require("../entity/User.js");
const Order = require("../entity/Order.js")
const connection = require("../entity/connection.js")


async function main() {
    User.hasMany(Order, {
        as: 'orders',
        foreignKey: 'user_id'
    })
    Order.belongsTo(User, {
        as: 'user',
        foreignKey: 'user_id'
    });
    return Promise.all([
        await connection.drop(),
        await Product.sync({force: true}),
        await User.sync({force: true}),
        await Order.sync({force: true})
    ])
}

if (require.main === module) {
    main()
        .then(() => {
            console.log('Db updated')
        })
}

module.exports = main



