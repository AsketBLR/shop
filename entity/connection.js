const {Sequelize} = require('sequelize');


module.exports = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    logging: false
});

