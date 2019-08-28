var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty123',
    database: 'distribution',
    multipleStatements: true
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

router.post('/', (req, res, next) => {
    const USER_EXIST = `SELECT * FROM users WHERE name='${req.body.username}' LIMIT 1;
                        SELECT * FROM users WHERE email='${req.body.email}' LIMIT 1;`;

    connection.query(USER_EXIST, function (err, results) {
        if (err){
            throw err;
        } else {
            let name = '',
                email = '',
                clearForm = false,
                error = 'Registration failed',
                message = '';

            if (results[0][0] !== undefined) {
                name = 'Name already in use';
            }

            if (results[1][0] !== undefined) {
                email = 'Email already in use';
            }

            if (results[0][0] === undefined && results[1][0] === undefined) {
                connection.query(
                    `INSERT INTO users (name, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}')`,
                    function (error, results) {
                        if (error) {
                            throw error;
                        }
                    });
                clearForm = true;
                error = '';
                message = 'Registration completed successfully';
            }

            res.send({ name: name, email: email, clearForm: clearForm, message: message, error: error });
        }
    });
});


module.exports = router;