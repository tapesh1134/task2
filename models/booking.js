const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Booking = sequelize.define('Booking', {

  userId: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  
  eventId: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
});

module.exports = Booking;
