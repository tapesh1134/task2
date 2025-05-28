const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING, allowNull: false },
  description: {
    type: DataTypes.TEXT},
  dateTime: {
    type: DataTypes.DATE },
  location: {
    type: DataTypes.STRING},
  totalSeats: {
    type: DataTypes.INTEGER},
  availableSeats: {
    type: DataTypes.INTEGER}
});

module.exports = Event;
