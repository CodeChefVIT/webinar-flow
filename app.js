// dependencies
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose'),
        cors        = require('cors'),
        jwt         = require('jsonwebtoken'),
        config      = require('./config'),
        middleware  = require('./middleware'),
        app         = express();

require('env2')('.env');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

// ------------- setting up jwt ---------------

class HandleGenerator{
    login(req, res){
        let password = req.body.password;
        let adminPassword = process.env.password;
    
        if(password){
            if(password == adminPassword){
                let token = jwt.sign({username: process.env.admin}, config.secret, {expiresIn: '24h'});
                console.log('admin login')
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            }
            else{
                res.json({
                    success: false,
                    message: 'Incorrent username or password'
                });
            }
        }
        else{
            res.json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }
}

let handlers = new HandleGenerator();

// conneting to mongodb
mongoose.connect(process.env.mongoURL, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.connection
    .once('open', () => console.log('connected to database'))
    .on('error', (error) => console.log('connection to database failed. Error = ', error));

// ---------------------    MODELS   ---------------------

const Webinar       = require('./models/webinarListModel');
const EmailId       = require('./models/emailIdsListModel');
const EmailWebinar  = require('./models/emailsWebinarModel');

// ---------------------    ROUTES    ---------------------

// --------- Login ---------

app.post('/', handlers.login)
// -----------------------


// ------------- list of past and upcoming webinars ------------
app.get('/home', middleware.checkToken, (req,res) => {
    Webinar.find({})
            .then((allWebinars) => {
                res.json({'success' : true, 'webinars': allWebinars});
            })
            .catch((err) => {
                console.log('cant get the data. error = ',err)
                res.json({'success' : false});
            });
})
// ---------------------------


//  --------- add new webinar ----------

app.post('/home/newWebinar', middleware.checkToken, (req,res) => {
    // add new webinar data to db
    
    let newWebinar = {
        name: req.body.name,
        eventDate: req.body.eventDate,
        description: req.body.description,
        regLive : req.body.regLive
    }
    
    new Webinar(newWebinar)
            .save()
            .then((webinar) =>{
                console.log(webinar);
                res.json({'save' : true});
            })
            .catch((err) => {
                console.log(err)
                res.json({'save' : false})
            })   
})
// -------------------------


// --------- edit a exiting webinar ----------
app.get('/home/:objId/edit', middleware.checkToken, (req,res) => {
    Webinar.findOne({_id: req.params.objId})
            .then((webinar) => {
                res.json({'found': true, 'data': webinar});
            })
            .catch((err) => {
                console.log('error=', err, 'while finding ',req.params.objId);
                res.json({'found': false});
            })
})

app.post('/home/:objId/edit', middleware.checkToken, (req,res) => {
    let updatedWebinar = {
        name: req.body.name,
        eventDate: req.body.eventDate,
        description: req.body.description,
        videoLink: req.body.videoLink,
        regLive: req.body.regLive
    };

    Webinar.findOneAndUpdate({_id: req.params.objId},{$set: updatedWebinar},{new: true})
            .then((webinar) => {
                console.log('updated webinar is : ', webinar);
                res.json({'edit' : true});
            })
            .catch((err) => {
                console.log('error while updating db: ',err);
                res.json({'edit' : false});
            })
})
// -----------------------


// -------- delete a webinar ---------
app.get('/home/:objId/delete', middleware.checkToken, (req,res) => {
    Webinar.findOneAndDelete({_id: req.params.objId})
            .then((webinar) => {
                console.log('deleted webinar=', webinar);
                res.json({'delete' : true});
            })
            .catch((err) => {
                console.log('error while deleting: ', err);
                res.json({'delete' : false});
            })
})
// -----------------------


// -------- end session: logout -----------
app.get('/logout', middleware.checkToken, (req,res) => {
    // on clicking the logout button
    req.session.destroy();
    res.json({'logout': true})
})
// ------------------------


// --------- registration form ----------
app.get('/:objId/webinarRegistration', (req,res) => {
    Webinar.findOne({_id: req.params.objId})
            .then((webinar) => {
                res.json({'found': true, 'data': webinar});
            })
            .catch((err) => {
                console.log('cant get the data for reg. error = ', err);
                res.json({'found': false});
            })
})

app.post('/:objId/webinarRegistration', (req,res) => {
    let email = req.body.email;
    
    // send mail to this person
        // to be done by navyaa
    // add to webinar wise emails list
    new EmailWebinar({
        'email' : email,
        'webinarId': req.params.objId
    })  .save()
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    // add email to email dump (unique only)
    EmailId.findOne({'email': email})
            .then((check) => {
                if(!check){
                    new EmailId({'email': email})
                        .save()
                        .then((email) =>{
                            console.log(email);
                            res.json({'save': true});
                        })
                        .catch((err) => {
                            console.log(error);
                            res.json({'save': false});
                        })
                }
                else{
                    console.log('duplicate email found')
                    res.json({'save': true});
                }
            })
            .catch((err) => {
                console.log(err);
            })
})


app.listen(3000,()=>console.log("connected to port 3000"))