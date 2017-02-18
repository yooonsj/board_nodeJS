var winston = require('winston');
require('winston-daily-rotate-file');
require('date-utils');
var moment = require('moment');
var path = require('path');

var LOGGER_ROOT = path.join(__dirname, '../logs/');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        name:'consoleLog',
        level: 'debug',
        colorize:false,
        timestamp: function(){return new Date().toFormat('YYYY-MM-DD HH24:MI:SS');},
        json:false
      }),

      new (winston.transports.File)({
        name: 'infoLog',
        level: 'info',
        filename: LOGGER_ROOT + 'info.log',
        maxsize:1000000,
        maxFiles:5,
        timestamp: function(){return new Date().toFormat('YYYY-MM-DD HH24:MI:SS');},
        json:false
      }),
      new (winston.transports.File)({
        name: 'errorLog',
        level: 'error',
        filename: LOGGER_ROOT + 'error.log',
        maxsize:1000000,
        maxFiles:5,
        timestamp: function(){return new Date().toFormat('YYYY-MM-DD HH24:MI:SS');},
        json: false
      }),
      new (winston.transports.DailyRotateFile)({
        name: 'dailyInfoLog',
        level: 'info',
        filename: LOGGER_ROOT + '.log',
        timestamp: function(){return new Date().toFormat('YYYY-MM-DD HH24:MI:SS');},
        prepend: true,
        datePattern : 'yyyyMMdd',
        json: false
      })
    ]
  });

  module.exports = logger;
