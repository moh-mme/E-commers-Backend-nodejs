const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  }
);
sequelize.sync({force:false,alter:true});

const connectDB = async () => {
  try {
    
    await sequelize.authenticate();
    console.log('Connected!');
  } catch (err) {
    console.error('Unable to connect:', err);
  }
};

module.exports = { sequelize, connectDB };