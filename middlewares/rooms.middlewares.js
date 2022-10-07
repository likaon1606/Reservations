const { Room } = require('../models/rooms.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const roomExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const room = await Room.findOne({
      where: { id, status: 'active' },
    });
  
    if (!room) {
      return next(new AppError('Room does not exist with given Id', 404));
    }
  
    // Add movie data to the req object
    req.room = room;
    next();
  });

module.exports = {
    roomExists,
};