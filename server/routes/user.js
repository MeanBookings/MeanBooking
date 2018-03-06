const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");
const User = require("../models/User");
const checkRoles = require("../middlewares/checkRoles");
const nodemailer = require('nodemailer');
const {emailName, emailPw} = require('../config');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailName,
        pass: emailPw
    }
});

let mailOptions = {
    from: emailPw,
    to: '',
    subject: '',
    html: ''
};

// api/user/
 router.get("/", checkRoles("admin"), (req, res, next) => {
//router.get("/", (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(e => res.status(500).json(e));
});


// api/user/delete/:id
router.get('/delete/:id', onlyMe, (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).json({ message: 'removed' }))
        .catch(e => res.status(500).json(e))
});

// api/user/makeadmin/:id
router.get('/makeadmin/:id', onlyMe, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { "role": "admin" })
        .then(() => res.status(200).json({ message: 'Updated' }))
        .catch(e => res.status(500).json(e))
});

router.post('/massiveemail', onlyMe, (req, res, next) => {
    let text = req.body.text
    let emails = req.body.emails
    // console.log(emails.toString())
    emails.forEach((e) => {
        mailOptions.subject = 'Mean Restaurant want to tell you something';
        mailOptions.html = text
        mailOptions.to = e;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    })
})

// api/user/bookings/:id
router.get('/bookings/:id', onlyMe, (req, res, next) => {
    User.findById(req.params.id).populate('bookings')
        .then(bookings => {res.status(200).json(bookings)})
        .catch(e => res.status(500).json(e))
});


module.exports = router;