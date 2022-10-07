const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MODELS
const { User } = require('../models/users.model');
const { Reservation } = require('../models/reservations.model');
const { Room } = require('../models/rooms.model');

// UTILS
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');


const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
        include: [{ model: Reservation}]
    });
        res.status(200).json({
        users,
    });
});

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password} = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    // INSERT IN TO..
    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
    });
    newUser.password = undefined;

    res.status(201).json({status: 'success', newUser});
});

const getUserById = catchAsync(async (req, res, next) => {
    const { user } = req;

    res.status(200).json({
        user,
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { name, email } = req.body;

    await user.update({ name, email });

    res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    await user.update({ status: 'deleted'});

    res.status(200).json({
        status: 'success',
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Validate that user exists with given email
    const user = await User.findOne({
      where: { email, status: 'active' },
    });
  
    // Compare password with db
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Invalid credentials', 400));
    }
  
    // Generate JWT
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  
    user.password = undefined;
  
    res.status(200).json({ token, user });
  });
  
  const checkToken = catchAsync(async (req, res, next) => {
    res.status(200).json({ user: req.sessionUser });
  });

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    login,
    checkToken,
};
