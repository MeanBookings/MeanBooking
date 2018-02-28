const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./types/day-types');

const daySchema = new Schema({
    date: { type: Date, required: true },
    status: { type: String, enum: TYPES, required: true },
    shift: [
        {"Hour": {type: String, default:"13:00"}, "current": {type: Number, default:"0"}, "max":{type: Number, default:"20"}},
        {"Hour": {type: String, default:"14:00"}, "current": {type: Number, default:"0"}, "max":{type: Number, default:"20"}},
        {"Hour": {type: String, default:"15:00"}, "current": {type: Number, default:"0"}, "max":{type: Number, default:"20"}},
        {"Hour": {type: String, default:"21:00"}, "current": {type: Number, default:"0"}, "max":{type: Number, default:"20"}},
        {"Hour": {type: String, default:"22:00"}, "current": {type: Number, default:"0"}, "max":{type: Number, default:"20"}},
        {"Hour": {type: String, default:"23:00"}, "current": {type: Number, default:"0"}, "max":{type: Number, default:"20"}}
    ]
}, {
    timestamps: {
        createdAt: 'created_at',
            updatedAt: 'updated_at'
    }
});

const Day = mongoose.model('Day', daySchema);
module.exports = Day;