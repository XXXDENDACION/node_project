const express = require('express');
const genres = require('../routes/genres');
const logger = require('../middleware/logger');
const courses = require('../routes/courses');
const auth = require('../routes/auth');
const home = require('../routes/home');
const users = require('../routes/user');
const err = require('../middleware/error');
const customer = require('../routes/customer');
const rental = require('../routes/rental');
const movie = require('../routes/movie');
const returns = require('../routes/returns');


module.exports = function (app) {
    app.use(express.json());
    app.use('api/courses', courses);
    app.use('/', home);
    app.use('/api/genres', genres);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/customer', customer);
    app.use('/api/rental', rental);
    app.use('/api/movie', movie);
    app.use('/api/returns', returns);
    app.use(err);
    app.use(logger);
};
