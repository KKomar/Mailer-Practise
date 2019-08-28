var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty123',
    database: 'distribution'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

router.get('/', (req, res, next) => {
    const CLIENTS = `SELECT * FROM clients`;

    connection.query(CLIENTS, function (err, results) {
        if (err){
            throw err;
        }

        res.send(results);
    });
});

module.exports = router;