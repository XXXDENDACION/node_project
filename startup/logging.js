const winston = require('winston');
//require('winston-mongodb');
require('express-async-errors');

module.exports = function () {

    const logger = winston.createLogger(new winston.transports.File({
        filename: 'logfile.log',
        handleExceptions: true
    }));

    logger.exceptions.handle(
        new winston.transports.File({ filename: 'exceptions.log'})
    );
    // winston.add(new winston.transports.MongoDB({
    //     db: 'mongodb+srv://frostyfeet:catzilla228@sandbox.cta6r.mongodb.net/films?retryWrites=true&w=majority',
    //     options: {
    //         useUnifiedTopology: true,
    //     }
    // }));
};
