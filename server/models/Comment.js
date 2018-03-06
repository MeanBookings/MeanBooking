const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./types/comment-types');


const commentSchema = new Schema({
    user_Id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    status:  {type: String, enum: TYPES, default: 'false' },
    stars: { type: Number, required: true },
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;


