require('dotenv').config();
module.exports = {
    dbURL: process.env.DBURL,
    emailName: process.env.EMAILNAME,
    emailPw: process.env.EMAILPW
}
//rama para subir a heroku desde la carpeta principal
//git subtree push --prefix=server heroku master