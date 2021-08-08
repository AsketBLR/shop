const {Sequelize, DataTypes, Model, Op} = require('sequelize');
const connection = require('./connection.js')


class User extends Model {
    static roles = {
        customer: 'Покупатель',
        employee: 'Сотрудник',
        admin: 'Администратор'
    }
}

User.init({
        name: {
            type: DataTypes.STRING
        },
        cart:{
            type: DataTypes.TEXT,
            get() {
                return JSON.parse(this.getDataValue('cart'))
            },
            set(value) {
                this.setDataValue('cart', JSON.stringify(value));
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            get() {
                return JSON.parse(this.getDataValue('address'))
            },
            set(value) {
                this.setDataValue('address', JSON.stringify(value));
            }
        },
        role: {
            type: DataTypes.INTEGER,
            get() {
                const roleId = this.getDataValue('role');
                switch (roleId) {
                    case 0:
                        return User.roles.customer
                    case 1:
                        return User.roles.employee
                    case 2:
                        return User.roles.admin
                    default:
                        return User.roles.customer
                }
            },
            set(value) {
                switch (value) {
                    case User.roles.customer:
                        this.setDataValue('role', 0);
                        break;
                    case User.roles.employee:
                        this.setDataValue('role', 1);
                        break;
                    case User.roles.admin:
                        this.setDataValue('role', 2);
                        break;
                    default:
                        this.setDataValue('role', 0);
                }
            }
        }
    },
    {
        sequelize: connection,
        tableName: 'users',
        modelName: 'User'
    })

module.exports = User