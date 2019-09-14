require('env2')('.env');

module.exports = {
    secret: process.env.secret
}

