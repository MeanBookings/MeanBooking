const express = require('express');
const router = express.Router();
const debug = require('debug')("server:book");
const bcrypt = require('bcrypt');

const Book = require('../models/Book');
const Day = require('../models/Day')
const User = require('../models/User')
const nodemailer = require('nodemailer');
const { emailName, emailPw } = require('../config');
const template1 = require('./email_template1');
const template2 = require('./email_template1');
const {prodURL} = require ('../config');
const moment = require('moment')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailName,
        pass: emailPw
    }
});

let mailOptions = {
    from: emailName,
    to: '',
    subject: '',
    html: ''
};

let pendingBooksDays;

// /api/book/ - Get the approved
router.get('/', (req, res, next) => {
    pendingBooksDays = []
    let encontrado = false
    Day.find()
        .populate({
            path: 'books', populate: { path: 'user' }
        })
        .then(days => {
            days.forEach(day => {
                encontrado = false;
                day.books.forEach(book => {
                    if (book.status === 'pending' && !encontrado) {
                        pendingBooksDays.push(day)
                        encontrado = true
                    }
                })
            })
            res.status(200).json(pendingBooksDays)
        })
})

// /api/book/create - create the book
router.post('/create', (req, res, next) => {
    let tIndex;
    let obj = {}
    const { email, name, phone, date_of_book, hour, people, comment } = req.body;
    User.findOne({ "email": email })
        .then((user) => {
            if (user == null) {
                newUser = new User({ email, name, phone })
                newUser.save()
                    .then((newuser) => {
                        bookingUser(newuser._id);
                    })
            } else {
                bookingUser(user._id);
            }
        })
    let bookingUser = ((user) => {
        const theBook = new Book({ hour, people, user, comment, date: date_of_book });
        theBook.save()
            .then(book => {
                User.findById(user)
                    .then(u => {
                        const updatedUser = u;
                        updatedUser.bookings.push(book._id);
                        User.findOneAndUpdate({ _id: u._id }, updatedUser, { new: true })
                            .then((user) => console.log(`actualizado historial de reservas del usuario ${user.name}`))
                    })
                Day.findOne({ date: date_of_book })
                    .then(day => {
                        day.shift.forEach((s, i) => {
                            if (s.hour == hour) {
                                tIndex = i;
                            }
                        })
                        const updatedDay = day;
                        updatedDay.shift[tIndex].current -= people;
                        updatedDay.books.push(book._id);
                        Day.findOneAndUpdate({ _id: day._id }, updatedDay, { new: true })
                            .then((result) => res.status(200).json(result))
                        mailOptions.subject = "Your book in Avello's Trattoria is pending approvation";
                        let date = moment(book.date).format("DD MMMM");
                        let www = `${prodURL}api/book/delete/${book._id}`;
                        console.log(www)
                        mailOptions.html = template1(`Your booking for the ${date}, at ${book.hour}, for ${book.people} in Avello's Trattoria is <strong style="color:GoldenRod">PENDING</strong> approvation`,www)
                        mailOptions.to = email;
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        })
                    })
                    .catch(e => {
                        res.status(500).json(e)
                    })
            })
    })

})

// /api/book/edit/:id - update the book, if status = "approved" sends an emails
router.post('/edit/:id', (req, res, next) => {
    let { status } = req.body;
    Book.findById(req.params.id)
        .then((book) => {
            updatedBook = book;
            updatedBook.status = status;
            Book.findByIdAndUpdate(req.params.id, updatedBook, { new: true })
                .populate('user')
                .then((book) => {
                    if (book.status == "approved") { updatedEmail(book) };
                    res.status(200).json(book)
                })
        })
})
let updatedEmail = ((book) => {
    mailOptions.subject = 'Your booking in Mean Restaurant is approved';
    let date = moment(book.date).format("DD MMMM");
    mailOptions.html = template1(`Your booking for the ${date}, at ${book.hour}, for ${book.people} in Avello's Trattoria is <strong style="color:green">APPROVED</strong>`,`${prodURL}api/book/delete/${book._id}`)
    mailOptions.to = book.user.email;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})

// /api/book/delete/:id - Delete de book solo con el :id del book, comprobar que no está cancelada antes...
router.get('/delete/:hash', (req, res, next) => {
    let tIndex, dEmail;
    Book.findById(req.params.hash)
        .then((b) => {
            if (b.status == "pending" || b.status == "approved") {
                Book.findByIdAndUpdate(req.params.hash, { $set: { "status": "cancelled" } }).populate('user')
                    .then((book) => {
                        Day.findOne({ books: req.params.hash })
                            .then((day) => {
                                day.shift.forEach((s, i) => {
                                    if (s.hour == book.hour) {
                                        tIndex = i;
                                    }
                                })
                                const updatedDay = day;
                                cancelledEmail(book.user.email);
                                updatedDay.shift[tIndex].current += book.people;
                                updatedDay.books.splice(updatedDay.books.indexOf(req.params.hash, 1));
                                Day.findOneAndUpdate({ _id: day._id }, updatedDay, { new: true })
                                    .then(()=>res.redirect('/profile'))
                            })
                    })
            }
        })
        .catch(e => {
            res.status(500).json(e)
        })
})

let cancelledEmail = ((book) => {
    let date = moment(book.date).format("DD MMMM");
    mailOptions.html = template2(`Your booking for the ${date}, at ${book.hour}, for ${book.people} in Avello's Trattori is <strong style="color:DarkRed">CANCELLED</strong>`)
    mailOptions.subject = 'Your booking in Mean Restaurant is cancelled';
    mailOptions.to = book.user.email;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})



module.exports = router;