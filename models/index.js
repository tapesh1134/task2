const {sequelize} =require('../config/db');
const User =require('./user');
const Event =require('./event');

const Booking =require('./booking');
User.hasMany(Booking,{foreignKey: 'userId'});

Booking.belongsTo(User,{foreignKey: 'userId'});

Event.hasMany(Booking,{foreignKey: 'eventId'});

Booking.belongsTo(Event,{foreignKey: 'eventId'});
module.exports = {sequelize,User,Event,Booking};
