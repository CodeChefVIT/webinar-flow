// dependencies
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        session     = require('express-session'),
        mongoose    = require('mongoose'),
        app         = express();

// setting body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// setting the home directory
const publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

// setup for creating session and other related stuff with authentication
app.use(session({
    secret: 'fldsk2232',
    resave: true,
    saveUninitialized: true
}))

let auth = function(req,res,next){
    if(req.session && req.session.password == password)
        return next();      // if a valid session is already running then continue 
    
    else
        return res.redirect('/');       // otherwise redirect to login form page
}

const password = "abc123"; 


// setting up db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/webinar', {useNewUrlParser: true});
mongoose.connection
    .once('open', () => console.log('connected to database'))
    .on('error', (error) => console.log('connection to database failed. Error = ', error));

// ---------------------    MODELS   ---------------------

const Webinar = require('./models/webinar');


// ---------------------    ROUTES    ---------------------

app.get('/', (req,res) => {
    // render the login form
    // res.send('login page')
    res.render('login.ejs')
})

app.post('/', (req,res) => {
    console.log(req.session);
    let enteredPassword = req.body.password;
    console.log(enteredPassword)
    if(password == enteredPassword){
        console.log('logged in');
        req.session.password = enteredPassword;
        res.send('/home');
    }
    else{
        console.log('wrong password');
        res.redirect('/')
    }
})

app.get('/home', auth, (req,res) => {
    Webinar.find({})
                    .then((allWebinars) => {
                        res.json({webinars: allWebinars})
                    })
                    .catch((err) => console.log('cant get the data'));
})

app.get('/home/newWebinar', auth, (req,res) => {
    //render the new webinar page
    // res.send('home/newWebinar-get')
    res.render('newWebinar.ejs')
})

app.post('/home/newWebinar', auth, (req,res) => {
    // add new webinar data to db
    
    let newWebinar = {
        name: req.body.name,
        eventDate: req.body.eventDate,
        description: req.body.description,
    }
    
    new Webinar(newWebinar).save()
                            .then((temp) =>console.log(temp))
                            .catch((err) => console.log(err))

    res.send('home/newWebinar-post')
})

app.get('/logout', auth, (req,res) => {
    req.session.destroy();
    res.send('logout success');
})

app.listen(3000,()=>console.log("connected to port 3000"))