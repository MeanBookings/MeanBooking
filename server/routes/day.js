const express = require('express');
const router = express.Router();
const debug = require('debug')("server:day");
const Book = require('../models/Book');
const Day = require('../models/Day');
const moment = require('moment')

// /api/day/create - Create the basic Day
router.post('/create', (req, res, next) => {
    let fechas = req.body
    Promise.all(fechas.map(d => creaDia(d)))
        .then(res.status(200).json(fechas))
        .catch(e => {
            console.log(e);
            res.status(500).json(e)
        })
})
let creaDia = (fecha) => {
    //console.log(new Date.UTC(new Date(fecha)))

    Day.findOne({ "date": fecha })
        .then((day) => {
            if (!day) {
                let theDay = new Day({ "date": fecha });
                theDay.date.setHours("14")
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
let date = req.body.date
    Day.findOne({ date:date })
        .then(day => {
            
            return res.status(200).json(day);
            
        })
        .catch(err => {
            if (err) { return res.status(500).json(err); }
            if (!day) { return res.status(404).json(new Error("404")) }
        })
});


// GET THE MONTH BUILD COMPONENT
// /api/day/get/month
router.get('/month', (req, res, next) => {
    let month = moment().month();
    let year = moment().year()
    let from = moment().startOf("Month").startOf("isoWeek").format('YYYY-MM-DD');
    let days = moment(month + 1, 'M').daysInMonth()
    if ((moment([year]).isLeapYear()) && (month == 1))
        days++
    //let until = moment().year(year).month(month).date(days).format('YYYY-MM-DD');
    let until = moment().month(month).year(year).endOf('Month').endOf("isoWeek").format('YYYY-MM-DD');
    Day.find({ date: { $gte: from, $lte: until } })
        .then(days => {
            //CON PAPU
            /* days.forEach(d=>console.log(d.date))
            days = days.map(d=>Object.assign({}, d._doc, {date:moment(d._doc.date).format()})) */
            res.status(200).json({days})
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
    let from = moment().month(monthToView).year(year).startOf('Month').startOf("isoWeek").format('YYYY-MM-DD');
    let days = moment(monthToView + 1, 'M').daysInMonth()
    if ((moment([year]).isLeapYear()) && (monthToView == 1))
        days++
    let until = moment().month(monthToView).year(year).endOf('Month').endOf("isoWeek").format('YYYY-MM-DD');
    Day.find({ date: { $gte: from, $lte: until } })
        .then(days => {
            res.status(200).json(days)
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
    let dates = req.body
    Promise.all(dates.map((d) => busquedaDia(d))).then(dates => res.status(200).json(dates))
});

let busquedaDia = (day) => Day.find({ "date": day })


module.exports = router;