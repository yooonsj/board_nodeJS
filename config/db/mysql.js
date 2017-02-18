var mysql = require('mysql');
var handlebars = require('handlebars');
var logger   = require('../logger');

var pool  = mysql.createPool({
    host: '13.113.33.116',
    port: 3306,
    user: 'root',
    password: '1q2w3e4r%T',
    database: 'nodejs',
    connectionLimit: 20,
    waitForConnections: false
});

module.exports = {
    query: function(sql, data, cb) {
        sql = handlebars.compile(sql)(data);
        logger.log('info', sql);
        pool.query(sql, cb);
    },
    pool: pool
};
