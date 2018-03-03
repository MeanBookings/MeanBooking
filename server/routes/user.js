const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const onlyMe = require("../middlewares/onlyMe");
const User = require("../models/User");
const checkRoles = require("../middlewares/checkRoles");

router.get("/", checkRoles("Administrator"), (req, res, next) => {
    User.find().then(users => {
        res.render("admin/admin", { users: users });
    });
});



router.get('/delete/:id', onlyMe, (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).json({ message: 'removed' }))
        .catch(e => res.status(500).json(e))
});


module.exports = router;