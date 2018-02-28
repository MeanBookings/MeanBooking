const express = require('express');
const router = express.Router();
const debug = require('debug')("server:book");
const bcrypt = require('bcrypt');

const Book = require('../models/Book');
const Day = require('../models/Day')
const User = require('../models/User')

// /api/book/add - Add the book
router.post('/add', (req, res, next) => {
    console.log(req.body)
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
                            .then(() => console.log("ok"))
                    })
                    .catch(e => {
                        res.status(500).json(e)
                    })
            })
    })
})

// /api/book/edit/:id - update the book sending the emails

// /api/book/delete/:id - Delete de book
router.get('/delete/:hash', (req, res, next) => {
    const salt = bcrypt.genSaltSync(3);
    c = JSON.stringify(b._id)
    console.log("salmeron cabron")
    Book.find()
        .then((books) => {
            
            // let a = books.filter((b) => {
            //     console.log("")
                // c = JSON.stringify(b._id)
                // return ((bcrypt.hashSync(c, salt)) == req.params.hash)
                // console.log(a)
            // })
        })
        .catch(e => {
            res.status(500).json(e)
        })
})


module.exports = router;