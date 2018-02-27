const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./types/book-types');

const bookSchema = new Schema({
<<<<<<< HEAD
    hash: { type: String },
=======
>>>>>>> adb77712eeadcbefea6cdb2872f5e0cea865834f
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date_of_book: { type: Date },
    people: { type: Number },
<<<<<<< HEAD
    Status: { type: String, enum: TYPES }
=======
    status: { type: String, enum: TYPES }
>>>>>>> adb77712eeadcbefea6cdb2872f5e0cea865834f
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;