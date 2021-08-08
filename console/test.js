require('dotenv').config({path: '../.env'})
const Product = require("../entity/Product.js");
const User = require("../entity/User.js");
const Order = require("../entity/Order.js");
const Wish = require("../entity/Wish.js")
async function main(){
    const user = await User.findByPk(1,{
        include: [{
                model: Product,
                as: 'products',
            through: {
                // This block of code allows you to retrieve the properties of the join table
                model: Wish,
            }
        }]
    });
    console.log(user);
}
main()