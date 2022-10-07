const { User } = require('./users.model');
const { Room } = require('./rooms.model');
const { Reservation } = require('./reservations.model');

const initModels = () => {

    // 1 User <--> 1 Reservation
    User.hasOne(Reservation, { foreignKey: 'userId' })
    Reservation.belongsTo(User)

    // 1 Reservation <--> Room
    Reservation.hasOne(Room, { foreignKey: 'reservationId' })
    Room.belongsTo(Reservation)

};

module.exports = { initModels };