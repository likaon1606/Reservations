const express = require('express');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');

const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
} = require('../controllers/users.controllers');

// Utils

const router = express.Router();

router.post(
  '/auth/register',
  createUserValidations,
  checkValidations,
  createUser,
);

router.post('/auth/login', login);

// Apply protectToken middleware
router.use(protectToken);

router.get('/', getAllUsers);

// compare valid token
router.get('/check-token', checkToken); 

router
  .route('/:id')
  .get(userExists, protectAccountOwner, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
