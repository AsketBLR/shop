require('dotenv').config();
require('./hbs.js');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Product = require('./entity/Product.js');
const User = require('./entity/User.js');
const adminRouter = require('./admin/router.js');
const shopRouter = require('./shop/router.js');
const Order = require("./entity/Order.js");


const  app = express();
app.use(session({
    secret: 'secret_session_super_secret',
    saveUninitialized: false,
    resave: false
}))

app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(express.static('node_modules/feather-icons/dist'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(express.static('node_modules/sweetalert2/dist'));
app.use(express.static('node_modules/chart.js/dist'));
app.use(express.static('node_modules/axios/dist'));

app.use('/admin',adminRouter);
app.use('/shop', shopRouter);

User.hasMany(Order, {
    as: 'orders',
    foreignKey: 'user_id'
})
Order.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

app.get(
    '/',
    async (req, res)=>{
    const products = await Product.findAll();
    res.render('index', {products: products});
})


app.listen(3000, ()=>{
    console.log('server up 3000');
})