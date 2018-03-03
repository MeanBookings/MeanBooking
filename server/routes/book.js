const express = require('express');
const router = express.Router();
const debug = require('debug')("server:book");
const bcrypt = require('bcrypt');

const Book = require('../models/Book');
const Day = require('../models/Day')
const User = require('../models/User')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'meanbooking1@gmail.com',
        pass: 'm34nb00k'
    }
});

let mailOptions = {
    from: 'meanbooking1@gmail.com',
    to: '',
    subject: '',
    html: ''
};

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
        const theBook = new Book({ hour, people, user, comment });
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
                        mailOptions.subject = 'Your book in Mean Restaurant is pending of approvation';
                        mailOptions.html = (`<img src="https://www.mobilestudio.mx/wp-content/uploads/2017/07/curso_web_development_mean.png"></img><a href="http://localhost:3000/api/book/delete/${book._id}">Cancela tu reserva</a>`)
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
    mailOptions.html = (`<img src="http://moziru.com/images/stamp-clipart-approved-18.jpg"></img><a href="http://localhost:3000/api/book/delete/${book._id}">Cancela tu reserva</a>`)
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
                                        console.log(tIndex)
                                    }
                                })
                                const updatedDay = day;
                                // res.json(book);
                                cancelledEmail(book.user.email);
                                updatedDay.shift[tIndex].current += book.people;
                                updatedDay.books.splice(updatedDay.books.indexOf(req.params.hash, 1));
                                Day.findOneAndUpdate({ _id: day._id }, updatedDay, { new: true })
                                    .then((a) => res.json(a))
                            })
                    })
            }
        })
        .catch(e => {
            res.status(500).json(e)
        })
})

let cancelledEmail = ((email) => {
    mailOptions.subject = 'Your booking in Mean Restaurant is cancelled';
    mailOptions.html = (`<img src="http://www.comicsbeat.com/wp-content/uploads/2017/12/Cancelled.jpg"></img>`)
    mailOptions.to = email;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})

module.exports = router;