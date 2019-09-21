// dependencies
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose'),
        cors        = require('cors'),
        jwt         = require('jsonwebtoken'),
        config      = require('./config'),
        middleware  = require('./middleware'),
        app         = express();

require('dotenv').config();

let port = process.env.PORT || 3000;

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

let db = require('./config/keys');

mongoose.connect(db.mongoDB, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.connection
    .once('open', () => console.log('connected to database'))
    .on('error', (error) => console.log('connection to database failed. Error = ', error));


// ---------------------    ROUTES    ---------------------

// ----------- Admin routes ----------
let adminRoutes = require('./routes/adminRoutes');

// Login 

app.post('/', handlers.login)

app.use('/home',adminRoutes);

// Logout
app.get('/logout', middleware.checkToken, (req,res) => {
    res.json({'logout': true})
})



// --------- Registration Form Routes----------

let regFormRoutes = require('./routes/regFormRoutes');

app.use(regFormRoutes);
// app.get('/:objId/webinarRegistration', (req,res) => {
//     Webinar.findOne({_id: req.params.objId})
//             .then((webinar) => {
//                 res.json({'found': true, 'data': webinar});
//             })
//             .catch((err) => {
//                 console.log('cant get the data for reg. error = ', err);
//                 res.json({'found': false});
//             })
// })

// app.post('/:objId/webinarRegistration', (req,res) => {
//     let email = req.body.email;

//     EmailId.findOne({'email': email})
//             .then((check) => {
//                 if(check){
//                     // email already in dump
//                     // Navyaa -> send mail without email verification link
                    
//                     // adding email to email-webinar collection as email is already verified
//                     new EmailWebinar({
//                         'email': email,
//                         'webinarId': req.params.objId
//                     }).save()
//                         .then((data)=>{
//                             console.log(data)
//                             res.json({'save': true, 'found': true});
//                         })
//                         .catch((err)=>{
//                             console.log(err)
//                             res.json({'save': false, 'found': true});
//                         })
//                 }
//                 else{
//                     // add email to staging collection for verification
//                     new StagedEmail({
//                         'email': email,
//                         'webinarId': req.params.objId
//                     }).save()
//                         .then((data)=>{
//                             let verificationLink = `http://localhost:3000/webinarRegistration/${data['_id']}/verifiy`
//                             // Navyaa -> send mail with email verification link

//                             console.log(data);
//                             res.json({'save': true, 'found': false});
//                         })
//                         .catch((err)=>{
//                             console.log(err);
//                             res.json({'save': false, 'found': false});
//                         })
//                 }
//             })
//             .catch((err)=>{
//                 console.log(err);
//                 res.json({'save': false, 'found': false});
//             })
// })

// app.get('/webinarRegistration/:objId/verifiy', (req,res) => {
//     let linkobjId = req.params.objId;

//     // checking in staging collection
//     StagedEmail.findByIdAndDelete(linkobjId)
//                 .then((data) => {
//                     if(data){
//                           // adding to email-webinar collection
//                         new EmailWebinar({
//                             'email' : data['email'],
//                             'webinarId': data['webinarId']
//                         })  .save()
//                             .then((data) => {                                
//                                 console.log(data);
//                             })
//                             .catch((err) => console.log(err))
                    
//                         new EmailId({
//                             'email': data['email']
//                             })  .save()
//                                 .then((data) => {
//                                     console.log(data);
//                                 })
//                                 .catch((err)=>console.log(err))
                        
//                         res.json({'verified': true});

//                     }
//                     else{
//                         res.json({'verified': false});
//                     }
                    
                  
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     res.json({'verified': false});
//                 })
// })


app.listen(port,()=>console.log("connected to port ",port))