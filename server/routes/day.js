const express = require('express');
const router = express.Router();
const debug = require('debug')("server:day");
const moment = require('moment');
const Book = require('../models/Book');
const Day = require('../models/Day');

// /api/day/create - Create the basic Day
router.post('/create', (req, res, next) => {
    // console.log("hola")
    const {
        date,
        status,
        shift
    } = req.body;
    console.log(req.body)
    Day.findOne({
            date
        }).then((day) => {
            if (day) {
                return res.status(400).json({
                    message: 'The day is already generated'
                })
            }
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

// GET A DAY /api/day/:id
router.post('/', (req, res, next) => {
    console.log(moment(req.body.date))
    //let dateClean = `${req.body.date.split('T')[0]} 00:00:00.000`;
    Day.findOne({
            date: moment(req.body.date)
        })
        .then(day => {
            return res.json(day);
        })
        .catch(err => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!day) {
                return res.status(404).json(new Error("404"))
            }
        })
});

//GET MONTH

router.get('/month', (req, res, next) => {
    var twoDaysAgo = moment().subtract(2, 'day');
    var futureMonth = moment(currentDate).add(1, 'M');
    Day.find({ 'date': {"$gte": twoDaysAgo, "$lt": futureMonth} })
        .then(days => {
            console.log(days)
            return res.json(days);
        })
        .catch(err => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!day) {
                return res.status(404).json(new Error("404"))
            }
        })
});




// /api/day/delete - Delete the day




module.exports = router;