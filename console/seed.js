require('dotenv').config({path: '../.env'})
const connection = require("../entity/connection.js");

(async ()=>{
    await require('./init.js')();
    await require('./products.js')();
    console.log('Product added')
    await require('./users.js')()
    console.log('Users added')
    await require('./orders.js')()
    console.log('Orders added')
    await connection.close()
})()

