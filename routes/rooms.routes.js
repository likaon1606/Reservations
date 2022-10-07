const express = require('express');

// Middlewares
const {
  roomExists,
} = require('../middlewares/rooms.middlewares');

const { protectToken } = require('../middlewares/users.middlewares');

const {
  createRoomValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  getAllRooms,
  getRoomId,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/rooms.controllers');

// Utils
const { upload } = require('../utils/multer');

const router = express.Router();

// Apply protectToken middleware
router.use(protectToken);

// Call CRUD´S
router.post(
    '/',
    upload.single('profileimg'),
    createRoomValidations,
    checkValidations,
    createRoom,
);

router.get('/', getAllRooms);

router
  .route('/:id')
  .get(roomExists, getRoomId)
  .patch(roomExists, updateRoom)
  .delete(roomExists,  deleteRoom);

module.exports = { roomsRouter: router };