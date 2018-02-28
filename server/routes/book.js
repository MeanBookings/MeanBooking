const express = require('express');
const router = express.Router();
const debug = require('debug')("server:book");

const Book = require('../models/Book');
const Day = require('../models/Day')


// /api/book/add - Add the book
router.post('/add', (req, res, next) => {
    //HACER UN FIND PARA COGER EL INDEX Y LUEGO CAMBIARLO, MIRAR EJEMPLO
    let tIndex, t_Id, tPeople;
    let obj = {}
    const { email, name, phone, date_of_book, hour, people, status } = req.body;
    Day.findOne({ date: date_of_book })
        .then((day) => {
            t_Id = day._id;
            day.shift.forEach((sh, i) => {
                if (sh.hour == hour) {
                    tIndex = i;
                    tPeople = sh.current + people
                }
            })
            obj = { "hour": hour, "current": tPeople, "max": 20};
            console.log(obj)
        })
        
       
        .catch(e => {
            console.log(e);
            res.status(500).json(e)
        })
})
// /api/book/edit/:id - update the book sending the emails

// /api/book/delete/:id - Delete de book

module.exports = router;