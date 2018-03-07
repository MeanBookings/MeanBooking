const mongoose = require('mongoose');
const Menu = require('../models/menu');
const { dbURL } = require('../config');

mongoose.connect(dbURL)
    .then(() => console.log("Connected to DB"))
    .catch(e => console.error(e));

const menus = [{
    dayWeek: 1,
    starters: ["Provoleta1", "Ensalata1", "Anti-Pasti1", "Pan de Ajo1"],
    mainCourses: ["Penne", "Espaguetti", "Lasagna", "Gnocci"],
    desserts: ["Tiramisu", "Tarta de Queso"],
    price: "12",
    comments: ""
},{
    dayWeek: 2,
    starters: ["Provoleta", "Ensalata", "Anti-Pasti", "Pan de Ajo"],
    mainCourses: ["Penne", "Espaguetti", "Lasagna", "Gnocci"],
    desserts: ["Tiramisu", "Tarta de Queso"],
    price: "12",
    comments: ""
}, {
    dayWeek: 3,
    starters: ["Provoleta", "Ensalata", "Anti-Pasti", "Pan de Ajo"],
    mainCourses: ["Penne", "Espaguetti", "Lasagna", "Gnocci"],
    desserts: ["Tiramisu", "Tarta de Queso"],
    price: "12",
    comments: ""
}, {
    dayWeek: 4,
    starters: ["Provoleta", "Ensalata", "Anti-Pasti", "Pan de Ajo"],
    mainCourses: ["Penne", "Espaguetti", "Lasagna", "Gnocci"],
    desserts: ["Tiramisu", "Tarta de Queso"],
    price: "12",
    comments: ""
}, {
    dayWeek: 5,
    starters: ["Provoleta", "Ensalata", "Anti-Pasti", "Pan de Ajo"],
    mainCourses: ["Penne", "Espaguetti", "Lasagna", "Gnocci"],
    desserts: ["Tiramisu", "Tarta de Queso"],
    price: "12",
    comments: ""
}]

Menu.create(menus, (err) => {
    if (err) { throw (err) }
    mongoose.disconnect()
});