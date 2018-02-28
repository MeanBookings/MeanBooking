
const isLoggedIn = (req,res,next) => {
    if(req.user){
        next();
    }else{
        console.log("You need to login to see this content");
        res.redirect('/');
    }
}

module.exports = isLoggedIn;