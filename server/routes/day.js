const express = require('express');
const router = express.Router();
const debug = require('debug')("server:day");
const moment = require('moment');
const Book = require('../models/Book');
const Day = require('../models/Day');

// /api/day/create - Create the basic Day
router.post('/create', (req, res, next) => {
    // let dates = req.body.map((d) => d.split("T")[0])
    let fechas = req.body
    // console.log(fechas)
    Promise.all(fechas.map(d => creaDia(d)))
        // .then(dt => res.json(dt))
        .then(res.status(200))
        .catch(e => {
            console.log(e);
            res.status(500).json(e)
        })
})
let creaDia = (fecha) => {
    console.log(typeof fecha)
    console.log(fecha)
    // console.log(new Date.UTC(new Date(fecha)))
    Day.findOne({ "date": fecha })
        .then((day) => {
            if (!day) {
                // console.log(fecha)
                const theDay = new Day({ "date": fecha });
                console.log(theDay)
                theDay.save()
            }
        })
}

// /api/day/edit - Update the basic day to special day.
router.post('/edit', (req, res, next) => {
    days = req.body;
    Promise.all(days.map((d) => updateaDia(d))).then(days => res.json(days))
})
updateaDia = (newDay) => {
    if (newDay.books.length < 1) {
        Day.findOneAndUpdate({ "date": newDay.date }, newDay, { new: true })
            .then((c) => console.log(c))
    }
}

//CHECK AVAILABILITY
// /api/day/get
router.post('/', (req, res, next) => {
    // console.log(moment(req.body.date)) 
    //let dateClean = `${req.body.date.split('T')[0]} 00:00:00.000`;
    Day.findOne({ date: moment(req.body.date) })
        .then(day => {
            console.log(day)
            return res.json(day);
        })
        .catch(err => {
            if (err) { return res.status(500).json(err); }
            if (!day) { return res.status(404).json(new Error("404")) }
        })
});

// GET THE MONTH BUILD COMPONENT
// /api/day/get/month
router.post('/month', (req, res, next) => {
    let { currentDay, daysInCurrentMonth, month } = req.body;
    let from = moment().subtract(currentDay, 'days');
    let until = moment().add((daysInCurrentMonth - currentDay), 'days');
    //let dateClean = `${req.body.date.split('T')[0]} 00:00:00.000`;
    Day.find({ date: { $gte: from, $lte: until } })
        .then(days => {
            res.json(days)
        })
        .catch(err => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!days) {
                return res.status(404).json(new Error("404"))
            }
        })
});

// GET THE MONTH BUILD COMPONENT
// /api/day/month/view
router.post('/month/view', (req, res, next) => {
    let { monthToView, year } = req.body;
    moment().daysInMonth();
    let from = moment().year(year).month(monthToView).date(1).format('YYYY-MM-DD');
    let days = moment(monthToView + 1, 'M').daysInMonth()
    if ((moment([year]).isLeapYear()) && (monthToView == 1))
        days++
    let until = moment().year(year).month(monthToView).date(days).format('YYYY-MM-DD');
    res.json({ monthToView, from, days, until })
    //let dateClean = `${req.body.date.split('T')[0]} 00:00:00.000`;
    Day.find({ date: { $gte: from, $lte: until } })
        .then(days => {
            // res.json(days)
        })
        .catch(err => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!days) {
                return res.status(404).json(new Error("404"))
            }
        })
});

// /api/day/get - getting the selecting dates
router.post('/get', (req, res, next) => {
    // res.json(req.body)
    // let dates = req.body.map((d) => d.split("T")[0])
    let dates = req.body
    Promise.all(dates.map((d) => busquedaDia(d))).then(dates => res.json(dates))
});

let busquedaDia = (day) => Day.find({ "date": day })


module.exports = router;