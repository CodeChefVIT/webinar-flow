// dependencies
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        mongoose    = require('mongoose'),
        cors        = require('cors'),
        jwt         = require('jsonwebtoken'),
        request     = require('request'),
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
                let token = jwt.sign({username: process.env.admin}, config.secret, {expiresIn: '5h'});
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

// routes only for admin
app.use('/home',adminRoutes);

// Logout
app.get('/logout', middleware.checkToken, (req,res) => {
    res.json({'logout': true})
})



// --------- Registration Form Routes----------

let regFormRoutes = require('./routes/regFormRoutes');

app.use(regFormRoutes);



app.listen(port,()=>console.log("connected to port ",port))