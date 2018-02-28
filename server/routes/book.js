const express = require('express');
const router = express.Router();
const debug = require('debug')("server:book");

const Book = require('../models/Book');
const Day = require('../models/Day')
const User = require('../models/User')


// /api/book/add - Add the book
router.post('/add', (req, res, next) => {
    let tIndex;
    let obj = {}
    const { email, name, phone, date_of_book, hour, people, comment } = req.body;
    User.findOne({ "email": email })
        .then((user) => {
            if (user == null) {
                newUser = new User({
                    email,
                    name,
                    phone
                })
                newUser.save()
                    .then((newuser) => {
                        bookingUser(newuser._id);
                    })
            } else {
                bookingUser(user._id);
            }
        })
    let bookingUser = ((user) => {
        const theBook = new Book({
            hour,
            people,
            user,
            comment
        });
        theBook.save()
            .then(book => {
                // User.findById(user._id)
                debug(`Registered book ${book.comment}`);
                Day.findOne({ date: date_of_book })
                    .then(day => {
                        console.log(day)
                        day.shift.forEach((s, i) => {
                            if (s.hour == hour) {
                                tIndex = i;
                                console.log(tIndex)
                            }
                        })
                        const updatedDay = day;
                        updatedDay.shift[tIndex].current -= people;
                        updatedDay.books.push(book._id);
                        res.json(updatedDay)
                        Day.findOneAndUpdate({ _id: day._id }, updatedDay, { new: true })
                    })
                    .catch(e => {
                        res.status(500).json(e)
                    })

            })
    })
})
// /api/book/edit/:id - update the book sending the emails

// /api/book/delete/:id - Delete de book

module.exports = router;