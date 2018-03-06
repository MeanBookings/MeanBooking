require('dotenv').config();
module.exports = {
    dbURL: process.env.DBURL,
    emailName: process.env.EMAILNAME,
    emailPw: process.env.EMAILPW
}