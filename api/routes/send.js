var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: 'bonobono000011@gmail.com',
        pass: 'Aezakmi123@'
    }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/', (req, res, next) => {
    const emails = req.body.emails;
    const message = req.body.message;
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const attachments = req.body.attachments;

    var mail = {
        from: `${userName} <${userEmail}>`,
        to: `${emails}`,
        subject: 'It works!',
        text: `${message}`,
        attachments: attachments
    };

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err);
            let successfully = '';
            let error = 'Fail to send';
            let clearForm = false;

            res.send({ successfully: successfully, error: error, clearForm: clearForm });
        } else {
            let successfully = 'Successfully sent';
            let error = '';
            let clearForm = true;

            res.send({ successfully: successfully, error: error, clearForm: clearForm });
        }
    });
});


module.exports = router;