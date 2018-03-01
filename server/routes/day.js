const express = require('express');
const router = express.Router();
const debug = require('debug')("server:day");
const moment = require('moment');
const Book = require('../models/Book');
const Day = require('../models/Day');

// /api/day/create - Create the basic Day
router.post('/create', (req, res, next) => {
    const {
        date,
        status
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
                status
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




// GET A DAY /api/day/
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

// GET THE MONTH
router.get('/month', (req, res, next) => {
    console.log(moment(req.body.date))
    let fifAgo = moment().subtract(15, 'days');
    let fifAway = moment().add(15, 'days');
    //let dateClean = `${req.body.date.split('T')[0]} 00:00:00.000`;
    Day.find({date: {$gte:fifAgo,$lte: fifAway}})
        .then(days => {
            console.log(days);
            res.json(days)
        })
        .catch(err => {
            if (err) {
                console.log(err)
                return res.status(500).json(err);
            }
            if (!days) {
                return res.status(404).json(new Error("404"))
            }
        })
});

// /api/day/delete - Delete the day


// /api/day/get - getting the selecting dates
router.post('/get', (req, res, next) => {
    let dates = req.body.map((d) => d.split("T")[0])
    Promise.all(dates.map((d) => busquedaDia(d))).then(dates => res.json(dates))
});



let busquedaDia = (day) => Day.find({"date": day})


module.exports = router;