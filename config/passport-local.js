const passport = require('passport')

const usertbl = require('../models/registertbl')

const passportLocal = require('passport-local').Strategy;

passport.use(new passportLocal({
    usernameField : 'email'
},async(email,password,done)=>{
    try {
        let user = await usertbl.findOne({email : email});
        if(!user || user.password != password){
            console.log("Email or password in wrong");
            return done(null,false)
        }
        return done(null,user);
    } 
    catch (err) {
        if(err){
            return done(null,false)
        }
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    try {
        let user = await usertbl.findById(id);
        return done(null,user)
    } 
    catch (err) {
        return done(null,false)
    }
})

passport.checkAuthentication = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthentication = (req,res,next) =>{
    if(req.isAuthenticated()){
        res.locals.users = req.user;
    }
    return next();
}

module.exports = passport