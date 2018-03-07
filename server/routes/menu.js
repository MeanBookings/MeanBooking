const express = require("express");
const router = express.Router();
const Menu = require('../models/Menu');
const debug = require('debug')("server:menu");

// api/menu/
router.get("/", (req, res, next) => {
    Menu.find()
        .then(menu => res.status(200).json(menu))
        .catch(e => res.status(500).json(e));
});

// api/menu/create
router.post("/create", (req, res, next) => {
    let { dayWeek, starters, mainCourses, desserts, price, comments } = req.body
    const theMenu = new Menu({ dayWeek, starters, mainCourses, desserts, price, comments });
    theMenu.save()
        .then(menu => res.status(200).json(menu))
        .catch(e => { res.status(500).json(e) });
});

// api/menu/edit/:id
router.post("/edit/:id", (req, res, next) => {
    console.log(req.body)
    let { active, dayWeek, starters, mainCourses, desserts, price, comments } = req.body.menu
    Menu.findByIdAndUpdate(req.params.id, { $set: { active, dayWeek, starters, mainCourses, desserts, price, comments } }, { $new: true })
        .then(menuUpdated => res.status(200).json(menuUpdated))
        .catch(e => res.status(500).json(e));
});


module.exports = router;

