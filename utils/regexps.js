const validTelephone = /\d{9}/
const validUserName = /^[a-zA-Z0-9_]{5,}$/ // al least 5 char, alphanumerics and _
const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ // only aphanumerics at leat 8 char, 1 number, 1 lowercase, 1 uppercase, 

module.exports = { validTelephone, validUserName, validEmail, validPassword }