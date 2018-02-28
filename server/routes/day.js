const express = require('express');
const router = express.Router();
const debug = require('debug')("server:day");

const Book = require('../models/Book');
const Day = require('../models/Day');

// /api/day/create - Create the basic Day
router.post('/create', (req, res, next) => {
    // console.log("hola")
    const { date, status, shift } = req.body;
    console.log(req.body)
    Day.findOne({ date }).then((day) => {
        if (day) { return res.status(400).json({ message: 'The day is already generated' }) }
        const theDay = new Day({
            date,
            status,
            shift
        });
        return theDay.save()
            .then((day) => {
                res.status(200).json(day)
            })
    })
        .catch(e => {
            console.log(e);
            res.status(500).json(e)
        })
})
// /api/day/edit - Update the basic day to special day.

// /api/day/:id

// /api/day/delete - Delete the day




module.exports = router;