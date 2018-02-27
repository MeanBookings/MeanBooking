const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const bcrypt = require('bcrypt');
const debug = require('debug')("server:book");
const passport = require('passport')


// /api/book/add - Add the book
router.post('/signup', (req, res, next) => {
/*  email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date_of_book: { type: Date },
    people: { type: Number },
    status: { type: String, enum: TYPES }   */
    const {email,name,phone,date_of_book,people,status} = req.body;


})
// /api/book/edit/:id - update the book

// /api/book/delete/:id - Delete de book
