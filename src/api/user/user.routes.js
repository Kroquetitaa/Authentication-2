const UserRoutes = require('express').Router();

const{ register, login } = require('./user.controller');

const userCreateRateLimit = rateLimit({
    windowMS: 5 * 60 * 1000,
    max: 10,
    standarHeaders: true,
    legacyHeaders: false,
})

UserRoutes.post('/register', [userCreateRateLimit], register);
UserRoutes.post('/login', login);

module.exports = UserRoutes;