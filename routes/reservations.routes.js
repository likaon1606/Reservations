const express = require('express');

// Middlewares
const {
  reservationExists,
} = require('../middlewares/reservations.middlewares');

const { protectToken } = require('../middlewares/users.middlewares');

const {
  createReservationValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  getAllReservations,
  getReservationId,
  createReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservations.controllers');

const router = express.Router();

// Apply protectToken middleware
router.use(protectToken);

// Call CRUD´S
router.post(
    '/',
    createReservationValidations,
    checkValidations,
    createReservation,
);

router.get('/', getAllReservations);  

router
  .route('/:id')
  .get(reservationExists, getReservationId)
  .patch(reservationExists, updateReservation)
  .delete(reservationExists,  deleteReservation);

module.exports = { reservationsRouter: router };