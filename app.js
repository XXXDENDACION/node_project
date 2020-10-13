require('express-async-errors');
const winston = require('winston');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const err = require('./middleware/error');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const genres = require('./routes/genres');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const home = require('./routes/home');
const users = require('./routes/user');

if ( !config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtkey not defined');
    process.exit(1);
}

mongoose.connect('mongodb+srv://frostyfeet:catzilla228@sandbox.cta6r.mongodb.net/films?retryWrites=true&w=majority',
    {useUnifiedTopology: true,
       useNewUrlParser: true,
       useCreateIndex: true
    },)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect...'));

app.use(express.json());
app.use('api/courses', courses);
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/users', users);
app.use('/api/auth', auth);


app.use(logger);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Listening. ${port}`);
});
