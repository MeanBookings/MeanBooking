const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./types/day-types');

const daySchema = new Schema({
    date: { type: Date, required: true },
    status: { type: String, enum: TYPES, required: true },
    shift: [{ "day": [{ type: Schema.Types.ObjectId, ref: 'Book'}] , maxDay: 20}, 
            { "night": [{ type: Schema.Types.ObjectId, ref: 'Book'}] , maxNight: 20}]
}, {
    timestamps: {
        createdAt: 'created_at',
            updatedAt: 'updated_at'
    }
});

const Day = mongoose.model('Day', daySchema);
module.exports = Day;