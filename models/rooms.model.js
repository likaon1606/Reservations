const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const Room = db.define("room", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    roomImgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    beds: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amenities: {
        type: DataTypes.STRING,
        defaultValue: 'wifi,  all inclusive food and beverages',
    },
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
});

module.exports = { Room };