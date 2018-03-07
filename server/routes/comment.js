const express = require('express');
const router = express.Router();
const debug = require('debug')("server:day");
const Comment = require('../models/Comment');
const User = require('../models/User');

// api/comment/
router.get("/", (req, res, next) => {
    Comment.find()
        .populate('user_Id')
        .then(comments => res.status(200).json(comments))
        .catch(e => res.status(500).json(e));
});

// api/comment/create
router.post("/create", (req, res, next) => {
    let { user_Id, content, valoration } = req.body
    const theComment = new Comment({
        user_Id,
        content,
        "stars":valoration
    });
    theComment.save()
        .then(comment => res.status(200).json(comment))
        .catch (e => { res.status(500).json(e)});
});

// api/comment/edit/:id
router.post("/edit/:id", (req, res, next) => {
    let status = req.body.status
    Comment.findByIdAndUpdate(req.params.id, { $set: { "status": status } }, { $new: true })
        .then(commentUpdated => res.status(200).json(commentUpdated))
        .catch(e => res.status(500).json(e));
});

// api/comment/delete/:id
router.get("/delete/:id", (req, res, next) => {
    console.log("holi")
    Comment.findByIdAndRemove(req.params.id)
        .then(users => res.status(200).json(users))
        .catch(e => res.status(500).json(e));
});

module.exports = router;