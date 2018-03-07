const mongoose = require('mongoose');
const Menu = require('../models/menu');
const { dbURL } = require('../config');

mongoose.connect(dbURL)
    .then(() => console.log("Connected to DB"))
    .catch(e => console.error(e));

const menus = [{
    dayWeek: 1,
    starters: ["Polpettine di tonno e ricotta", "Involtini di verza", "Uova sode", "Frittata"],
    mainCourses: ["Lasagna", "Carbonara", "Tagliatelle al ragù", "Tortellini alla panna"],
    desserts: ["Tiramisu", "Torta di mele"],
    price: "12",
    comments: ""
},{
    dayWeek: 2,
    starters: ["Cipolline in agrodolce", "Mozzarella in carrozza", "Pizzette di sfoglia", "Cornetti salati"],
    mainCourses: ["Penne all’arrabbiata", "Gnocchi alla sorrentina", "Risotto alla crema di scampi", "Spaghetti allo scoglio"],
    desserts: ["Amaretti", "Krumiri"],
    price: "12",
    comments: ""
}, {
    dayWeek: 3,
    starters: ["Polpette di spinaci e ricotta", "Capesante gratinate", "Frittata di zucchine", "Radicchio al forno"],
    mainCourses: ["Spaghetti alle vongole", "Gramigna, salsiccia e panna", "Spaghetti Senatore Cappelli con cipollotto e peperoncino", "Carpaccio"],
    desserts: ["Cannoli", "Tronchetto di Natale"],
    price: "12",
    comments: ""
}, {
    dayWeek: 4,
    starters: ["Cavolfiore in pastella", "Teste di champignon ripieni", "Torta 5 minuti salata", "Polpette di quinoa, zucchine e stracchino"],
    mainCourses: ["Passatina di ceci e gamberi", "Agnolotti di Lidia", "Tortelli di zucca", "Savarin di riso e lingua"],
    desserts: ["Bisciola", "Pandolce"],
    price: "12",
    comments: ""
}, {
    dayWeek: 5,
    starters: ["Frittata di asparagi", "Uova alla coque", "Mozzarella fritta", "Avocado toast"],
    mainCourses: ["Spaghetti alla lampada", "Albanella di molluschi e crostacei", "Nudi di ricotta alle ortiche", "Tagliatella di seppia con pesto di alga nori"],
    desserts: ["Taralli dolci campani", "Crepes dolci con frutta e crema"],
    price: "12",
    comments: ""
}]

Menu.create(menus, (err) => {
    if (err) { throw (err) }
    mongoose.disconnect()
});