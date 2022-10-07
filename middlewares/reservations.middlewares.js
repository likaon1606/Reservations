const { Reservation } = require('../models/reservations.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const reservationExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const reservation = await Reservation.findOne({
      where: { id},
    });
  
    if (!reservation) {
      return next(new AppError('Reservation does not exist with given Id', 404));
    }
  
    // Add movie data to the req object
    req.reservation = reservation;
    next();
  });

module.exports = {
    reservationExists,
};