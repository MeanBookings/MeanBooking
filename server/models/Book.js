const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./types/book-types');

const bookSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date_of_book: { type: Date },
    hour: { type: String },
    people: { type: Number },
    status: { type: String, enum: TYPES }
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;