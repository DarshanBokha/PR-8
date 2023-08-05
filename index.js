const express = require('express')

const port = 8080

const app = express();

const path = require('path')

app.use('/uploads',express.static(path.join(__dirname,('uploads'))))

const db = require('./config/mongoose')

const flash = require('connect-flash')

const passport = require('passport')

const session = require('express-session')

const passportLocal = require('./config/passport-local')

const cookie = require('cookie-parser');

app.use(session({
    secret : 'admin',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000*60*60
    }
}))

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded())

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication)
app.use(flash());
app.use(cookie());

app.use((req,res,next)=>{
    res.locals.message = {
        'success' : req.flash('success'),
        'danger' : req.flash('danger')
    }
    next();
})

app.use('/',require('./routes'))

app.set('view engine','ejs')

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server start on port "+port);
})
