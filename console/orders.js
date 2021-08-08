require('dotenv').config({path: '../.env'})
const faker = require('faker');
const User = require('../entity/User.js');
const Product = require('../entity/Product.js');
const Order = require('../entity/Order.js');


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = async function main() {
    const promises = [];
    const users = (await User.findAll()).map(u=>u.id)
    const products = await Product.findAll()
    for (let i = 0; i <= 1000; i++) {
        const productsCount = faker.datatype.number({min : 1, max : 5})
        const rows = [];
        let total = 0
        for (let n = 1; n<= productsCount; n++){
            const randomProduct = faker.random.arrayElement(products);
            const randomCount = faker.datatype.number({min : 1, max : 3})
            const currentPrice = randomCount * randomProduct.price;
            total += currentPrice
            rows.push({
                id: randomProduct.id,
                count: randomCount,
                price: currentPrice
            })
        }
        promises.push(await Order.create({
            products: rows,
            total: total,
            user_id: faker.random.arrayElement(users),
            status: faker.random.arrayElement(Object.values(Order.statuses)),
            createdAt: randomDate(new Date(2020, 0, 1), new Date())
        }))
    }

    return Promise.all(promises)
}
