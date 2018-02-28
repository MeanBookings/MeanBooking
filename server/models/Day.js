const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./types/day-types');

const daySchema = new Schema({
    date: { type: Date, required: true },
    status: { type: String, enum: TYPES, required: true },
    shift: {
        type: Array, "default": [
            { "hour": "12:00", "current": 20 },
            { "hour": "12:30", "current": 20 },
            { "hour": "13:00", "current": 20 },
            { "hour": "13:30", "current": 20 },
            { "hour": "14:00", "current": 20 },
            { "hour": "14:30", "current": 20 },
            { "hour": "15:00", "current": 20 },
            { "hour": "15:30", "current": 20 },
            { "hour": "16:00", "current": 20 },
            { "hour": "16:30", "current": 20 },
            { "hour": "17:00", "current": 20 },
            { "hour": "17:30", "current": 20 },
            { "hour": "18:00", "current": 20 },
            { "hour": "18:30", "current": 20 },
            { "hour": "19:00", "current": 20 },
            { "hour": "19:30", "current": 20 },
            { "hour": "20:00", "current": 20 },
            { "hour": "20:30", "current": 20 },
            { "hour": "21:00", "current": 20 },
            { "hour": "21:30", "current": 20 },
            { "hour": "22:00", "current": 20 },
            { "hour": "22:30", "current": 20 },
            { "hour": "23:00", "current": 20 },
            { "hour": "23:30", "current": 20 }
        ]
    },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Day = mongoose.model('Day', daySchema);
module.exports = Day;