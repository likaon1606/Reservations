const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Room } = require('../models/rooms.model');
const { Reservation } = require('../models/reservations.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { storage } = require('../utils/firebase');

// CRUD'S
const getAllRooms = catchAsync(async (req, res, next) => {
    const rooms = await Room.findAll({
        include: { model: Reservation }
   }); 

    res.status(200).json({
        rooms,
   });
});

const getRoomId = catchAsync(async (req, res, next) => {
    const { room } = req;

    res.status(200).json({
        room,
    });
});

const createRoom = catchAsync(async (req, res, next) => {
    const { name, beds, bath, reservationId } = req.body;

    const imgRef = ref(storage, `rooms/${req.file.originalname}`);
    const imgUpLoaded = await uploadBytes(imgRef, req.file.buffer);

    // INSERT INTO...
    const newRoom = await Room.create({
        name,
        beds,
        bath,
        reservationId,
        roomImgUrl: imgUpLoaded.metadata.fullPath,
    });

    res.status(201).json({
        status: 'success', newRoom
    });

});

const updateRoom = catchAsync(async (req, res, next) => {
    const { room } = req;
    const { name, beds, bath } = req.body;

    await room.update({ name, beds, bath });

    res.status(200).json({ status: 'success' });
});

const deleteRoom = catchAsync(async (req, res, next) => {
    const { room } = req;

    await room.update({ status: 'deleted'});

    res.status(200).json({
        status: 'success',
    });
});

module.exports = { 
    getAllRooms,
    getRoomId,
    createRoom,
    updateRoom,
    deleteRoom,
};