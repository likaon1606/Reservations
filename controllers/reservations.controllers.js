// Models
const { Reservation } = require('../models/reservations.model');
const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

// CRUD'S
const getAllReservations = catchAsync(async (req, res, next) => {
    const reservations = await Reservation.findAll({
        
        include: { model: User, attributes: {exclude: ['password']} }
   }); 

    res.status(200).json({
        reservations,
   });
});

const getReservationId = catchAsync(async (req, res, next) => {
    const { reservation } = req;

    res.status(200).json({
        reservation,
    });
});

const createReservation = catchAsync(async (req, res, next) => {
    const { daysOfStay, RFC, IdClient, amountPaid, paymentMethod, userId, status } = req.body;

    // INSERT INTO...
    const newRoom = await Reservation.create({
        daysOfStay,
        RFC,
        IdClient,
        amountPaid,
        paymentMethod,
        userId,
        status,
    });

    res.status(201).json({
        status: 'success', newRoom
    });

});

const updateReservation = catchAsync(async (req, res, next) => {
    const { reservation } = req;
    const { daysOfStay, RFC, IdClient, amountPaid, paymentMethod, status } = req.body;

    await reservation.update({ 
        daysOfStay, 
        RFC, 
        IdClient, 
        amountPaid, 
        paymentMethod, 
        status 
    });

    res.status(200).json({ status: 'success' });
});

const deleteReservation = catchAsync(async (req, res, next) => {
    const { reservation } = req;

    await reservation.update({ status: 'deleted'});

    res.status(200).json({
        status: 'success',
    });
});

module.exports = { 
    getAllReservations,
    getReservationId,
    createReservation,
    updateReservation,
    deleteReservation,
};