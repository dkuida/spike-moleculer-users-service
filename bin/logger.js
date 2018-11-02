const logger = require('@dkuida/logger-wrapper');
const loggerConfig = require('../config/logger');
const loggerInstance = logger(loggerConfig);

module.exports = loggerInstance;
