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

router.post('/', (req, res, next) => {
    const USER_EXIST = `SELECT * FROM users WHERE email='${req.body.email}' AND password='${req.body.password}' LIMIT 1`;

    connection.query(USER_EXIST, function (err, results) {
        if (err){
            throw err;
        } else {
            let login = false,
                error = '',
                name = '',
                email = '';

            if (results[0] !== undefined) {
                login = true;
                name = results[0].name;
                email = results[0].email;
            }

            if (results[0] === undefined) {
                login = false;
                error = 'Wrong email or password';
            }

            res.send({ login: login, error: error, name: name, email: email });
        }
    });
});


module.exports = router;