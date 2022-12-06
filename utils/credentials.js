const regexp = require('./regexps');
const RandExp = require('randexp');

module.exports = ( ) => {
    
    let username;
    let email;
    let password;

    do {
        username = new RandExp(regexp.validUserName).gen();
    } while (!username.match(regexp.validUserName))

    do {
        password = new RandExp(regexp.validPassword).gen();
    } while (!password.match(regexp.validPassword))

    do {
        email = new RandExp(regexp.validEmail).gen();
    } while (!email.match(regexp.validEmail))

    username = String( username );
    password = String( password );
    email = String( email );
    let credential = { username, password, email };
    return credential;
}