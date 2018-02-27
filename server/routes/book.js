const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const debug = require('debug')("server:book");
const passport = require('passport')

const Book = require('../models/Book');
const Day = require('../models/Day')


// /api/book/add - Add the book
router.post('/add', (req, res, next) => {
    const {email,name,phone,date_of_book,hour,people,status} = req.body;
    Day.find({date:date_of_book})
                                .then((day)=>{
                                day.shift.hour.push()
                                console.log(day)
                                })
})
// /api/book/edit/:id - update the book

// /api/book/delete/:id - Delete de book

module.exports = router;