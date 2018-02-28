const express = require('express');
const router = express.Router();
const debug = require('debug')("server:book");

const Book = require('../models/Book');
const Day = require('../models/Day')


// /api/book/add - Add the book
router.post('/add', (req, res, next) => {
    let tIndex;
    let obj = {}
    const { email, name, phone, date_of_book, hour, people, status } = req.body;
    Day.findOne({ date: date_of_book })
        .then((day) => {
            day.shift.forEach((s, i) => {
                if (s.hour == hour) {
                    tIndex = i;
                }
            })
            const updatedDay = day;
            updatedDay.shift[tIndex].current += people;
            Day.findOneAndUpdate({ _id: day._id }, updatedDay, { new: true })
                .then(dayUpdated => res.json(dayUpdated))
        })
        .then(() => {
            const theBook = new Book({
                name,
                email,
                phone,
                date_of_book,
                hour,
                people,
                status
            });
            theBook.save()
                .then(book => {
                    debug(`Registered book ${book.email}, day ${book.date_of_book}, hour ${book.hour}, status ${status}`);
                    res.status(200).json(req.book)
                })
        })
        .catch(e => {
            res.status(500).json(e)
        })
})
// /api/book/edit/:id - update the book sending the emails

// /api/book/delete/:id - Delete de book

module.exports = router;