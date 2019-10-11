const   jwt     =   require('jsonwebtoken'),
        config  =   require('./config.js');

let checkToken = (req, res, next) => {
    let token = req.headers['authorization'];  // express headers
    
    if(!token){
        console.log('token not found');
        res.json({
            success: false, 
            message: 'No token found in header'
        })
    }
    else{
        if(token.startsWith('Bearer')){
            // remove bearer from string
            token = token.slice(7,token.length);
        }
    
        if(token){
            jwt.verify(token, config.secret, (err, decoded) => {
                if(err){
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            })
        }
        else{
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    }
}

module.exports = {
    checkToken: checkToken
}