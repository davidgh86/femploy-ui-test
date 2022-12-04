const regexp = require('./regexps');
const RandExp = require('randexp');

module.exports = ( ) => {
    
    let username = new RandExp(regexp.validUserName).gen();
    let email = new RandExp(regexp.validEmail).gen();
    let password = new RandExp(regexp.validPassword).gen();

    username = String( username );
    password = String( password );
    email = String( email );
    let credential = { username, password, email };
    return credential;
}