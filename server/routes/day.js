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
let creaDia = (fecha) =>{
    console.log(typeof fecha)
    console.log(fecha)
    console.log(new Date.UTC(new Date(fecha)))
    Day.findOne({ "date": fecha})
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


// Get the current month


//CHECK AVAILABILITY
router.post('/', (req, res, next) => {
    console.log(moment(req.body.date)) 
    //let dateClean = `${req.body.date.split('T')[0]} 00:00:00.000`;
    Day.findOne({ date: moment(req.body.date)})
        .then(day => {
            console.log(day)
            return res.json(day);
        })
        .catch (err => {
            if (err) { return res.status(500).json(err); }
            if (!day) { return res.status(404).json(new Error("404")) }
        }) 
});

// GET THE MONTH BUILD COMPONENT
router.get('/month', (req, res, next) => {
    let fifAgo = moment().subtract(15, 'days');
    let fifAway = moment().add(15, 'days');
    //let dateClean = `${req.body.date.split('T')[0]} 00:00:00.000`;
    Day.find({ date: { $gte: fifAgo, $lte: fifAway } })
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


// /api/day/get - getting the selecting dates
router.post('/get', (req, res, next) => {
    res.json(req.body)
    let dates = req.body.map((d) => d.split("T")[0])
    Promise.all(dates.map((d) => busquedaDia(d))).then(dates => res.json(dates))
});

<<<<<<< HEAD
let busquedaDia = (day) => Day.find({ "date": day })
=======
let busquedaDia = (day) => Day.find({"date": day})
>>>>>>> ab0b9a330b23b12df639f3f5063ad33b5855c71e


module.exports = router;