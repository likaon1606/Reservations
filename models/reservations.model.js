const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const Reservation = db.define("reservation", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    daysOfStay: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RFC: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IdClient: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = { Reservation };