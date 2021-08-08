const {Sequelize, DataTypes, Model, Op} = require('sequelize');
const connection = require('./connection.js')


class Order extends Model {
    static statuses = {
        new: 'Новый',
        processing: 'В обработке',
        delivered: 'Доставляется',
        completed: 'Завершен',
        canceled: 'Отменен'
    }
   static getOrderByStatus(status, count){
        return Order.findAll({
            limit: count,
            where:{
                status: {
                    [Op.eq]: Object.keys(Order.statuses).findIndex(s => status === Order.statuses[s])
                }
            },
            include: ["user"],
            order: [ ['updatedAt', 'DESC']]
        })
    }
}

Order.init({
        total: {
            type: DataTypes.FLOAT
        },
        products: {
            type: DataTypes.TEXT,
            get() {
                return JSON.parse(this.getDataValue('products'))
            },
            set(value) {
                this.setDataValue('products', JSON.stringify(value));
            }
        },
        status: {
            type: DataTypes.INTEGER,
            default: 0,
            get(){
                const index = Number.parseInt(this.getDataValue('status'))
                return Object.values(Order.statuses)[index]
            },
            set(value){
                const index = Object.values(Order.statuses).findIndex(o=> o===value);
                if(index){
                    this.setDataValue('status', index);
                }else {
                    this.setDataValue('status', 0);
                }
            }
        }
    },
    {
        sequelize: connection,
        tableName: 'orders',
        modelName: 'Order'
    })

module.exports = Order