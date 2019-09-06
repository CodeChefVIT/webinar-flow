// dependencies
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        session     = require('express-session'),
        mongoose    = require('mongoose'),
        cors        = require('cors'),
        app         = express();

require('env2')('.env');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

// setup for creating session and other related stuff with authentication
app.use(session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true
}))

let auth = function(req,res,next){
    if(req.session && req.session.loggedIn)
        return next();      // if a valid session is already running then continue 
    
    else
        return res.redirect('/');       // otherwise redirect to login form page
}

const password = process.env.password; 


// conneting to mongodb
mongoose.connect(process.env.mongoURL, {useNewUrlParser: true});
mongoose.connection
    .once('open', () => console.log('connected to database'))
    .on('error', (error) => console.log('connection to database failed. Error = ', error));

// ---------------------    MODELS   ---------------------

const Webinar = require('./models/webinarListModel');
const EmailId = require('./models/emailIdsListModel');

// ---------------------    ROUTES    ---------------------

// --------- Login ---------
app.get('/', (req,res) => {
    // render the login form
})

app.post('/', (req,res) => {
    let enteredPassword = req.body.password;
    if(password == enteredPassword){
        console.log('logged in');
        req.session.loggedIn = true;
        res.redirect('/home');
    }
    else{
        console.log('wrong password');
        res.redirect('/');
    }
})
// -----------------------

// ------------- list of past and upcoming webinars ------------
app.get('/home', auth, (req,res) => {
    Webinar.find({})
                    .then((allWebinars) => {
                        res.json({webinars: allWebinars})
                    })
                    .catch((err) => console.log('cant get the data. error = ',err));
})
// ---------------------------

//  --------- add new webinar ----------
app.get('/home/newWebinar', auth, (req,res) => {
    //render the new webinar page
})

app.post('/home/newWebinar', auth, (req,res) => {
    // add new webinar data to db
    
    let newWebinar = {
        name: req.body.name,
        eventDate: req.body.eventDate,
        description: req.body.description,
    }
    
    new Webinar(newWebinar).save()
                            .then((temp) =>{
                                console.log(temp);
                                res.redirect('/home');
                            })
                            .catch((err) => console.log(err))   
})
// -------------------------

// --------- edit a exiting webinar ----------
app.get('/home/:objId/edit', auth, (req,res) => {
    Webinar.findOne({_id: req.params.objId})
                .then((webinar) => {
                    res.json(webinar);
                })
                .catch((err) => {
                    console.log('error=', err, 'while finding ',req.params.objId);
                    res.redirect('/home');
                })
})

app.post('/home/:objId/edit', auth, (req,res) => {
    let updatedWebinar = {
        name: req.body.name,
        eventDate: req.body.eventDate,
        description: req.body.description,
        videoLink: req.body.videoLink
    };

    Webinar.findOneAndUpdate({_id: req.params.objId},{$set: updatedWebinar},{new: true})
            .then((webinar) => {
                console.log('updated webinar is : ', webinar);
                res.redirect('/home');
            })
            .catch((err) => {
                console.log('error while updating db: ',err);
                res.redirect('/home');
            })
})
// -----------------------

// -------- delete a webinar ---------
app.get('/home/:objId/delete', auth, (req,res) => {
    Webinar.findOneAndDelete({_id: req.params.objId})
            .then((webinar) => {
                console.log('deleted webinar=', webinar)
                res.redirect('/home')
            })
            .catch((err) => console.log('error while deleting: ', err))
})
// -----------------------

// -------- end session: logout -----------
app.get('/logout', auth, (req,res) => {
    // on clicking the logout button
    req.session.destroy();
    res.redirect('/');
})
// ------------------------


// --------- registration form ----------
app.get('/webinarRegistration', (req,res) => {
    // render the registration form
})

app.post('/webinarRegistration', (req,res) => {
    let email = req.body.email;
    new EmailId({email: email}).save()
                .then((data) => {
                    console.log('email added to db : ', data);
                    res.redirect('/webinarRegistration/success')
                })
                .catch((err) =>{
                    console.log('cant add to db. error = ', err);
                    res.redirect('/webinarRegistration');
                })
})

app.get('/webinarRegistration/success',(req,res) => {
    res.send('thank you for registering')
})
// ----------------------------


app.listen(3000,()=>console.log("connected to port 3000"))