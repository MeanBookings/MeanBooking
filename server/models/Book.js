const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./types/book-types');

const bookSchema = new Schema({
    hour: { type: String },
    date: { type: Date, required: true },
    people: { type: Number },
    status: { type: String, enum: TYPES, default: TYPES[0] },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, default: "" }
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;