const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Controllers
const { globalErrorHandler } = require('./controllers/errors.controllers');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { roomsRouter } = require('./routes/rooms.routes');
const { reservationsRouter } = require('./routes/reservations.routes');

// Init express app
const app = express();

//Enable Cors
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// Enable incoming Form-Data
app.use(express.urlencoded({ extended: true }));

// Limit IP requests
const limiter = rateLimit({
    max: 10000,
    windowMs: 1 * 60 * 60 * 1000, // 1hr
    message: 'Too many requests from this IP',
});

app.use(limiter);

// Enpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/rooms', roomsRouter);
app.use('/api/v1/reservations', reservationsRouter);


// Global error handler
app.use('*', globalErrorHandler);

module.exports = {app};