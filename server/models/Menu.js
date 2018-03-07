const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    active: {type: String, required: true, default: "false"},
    dayWeek: {type: String, required: true},
    starters: [{type: String}],
    mainCourses: [{type: String}],
    desserts: [{type: String}],
    price: {type: String},
    comments: {type: String}
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;