const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./types/book-types');

const bookSchema = new Schema({
    date_of_book: { type: Schema.Types.ObjectId, ref: 'Day' },
    hour: { type: String },
    people: { type: Number },
    status: { type: String, enum: TYPES, default: "pending" },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String }
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;