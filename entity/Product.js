const {Sequelize, DataTypes, Model, Op} = require('sequelize');
const connection = require('./connection.js')

class Product extends Model {
}

Product.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    images: {
        type: DataTypes.STRING(1000),
        get(){
            return JSON.parse(this.getDataValue('images'))
        },
        set(value){
            this.setDataValue('images', JSON.stringify(value));
        }
    },
    year: {
        type: DataTypes.INTEGER
    },
    brand: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    height: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    width: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    thickness: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    weight: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    os: {
        type: DataTypes.STRING
    },
    core: {
        type: DataTypes.STRING
    },
    coreCount: {
        type: DataTypes.STRING
    },
    hard: {
        type: DataTypes.INTEGER
    },
    ram: {
        type: DataTypes.INTEGER
    },
    material: {
        type: DataTypes.STRING
    },
    screenResolution: {
        type: DataTypes.STRING
    },
    screenSize: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    simCount: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    nfc: {
        type: DataTypes.BOOLEAN
    },
    wiFi: {
        type: DataTypes.BOOLEAN
    },
    fastCharge: {
        type: DataTypes.BOOLEAN
    },
    color: {
        type: DataTypes.STRING
    }
}, {
    sequelize: connection,
    tableName: 'products',
    modelName: 'Product'
})

module.exports = Product