const { DataTypes } = require('sequelize')
const { sequelize } = require('../data/connectionDB')
const { User } = require('./user.model')

const Order = sequelize.define(
    'Order',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
            defaultValue: 'pending'
        },
        total_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    },
);
Order.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

module.exports = { Order }
