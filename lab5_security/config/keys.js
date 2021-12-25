const crypto = require('crypto')

module.exports = {
    MONGO_DB_URI: 'mongodb+srv://illiaB:QazwSxedC123465@cluster0.lcj0o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    JWT_KEY: 'jwt-secret-key',
    AES_ENC_KEY: crypto.randomBytes(256/8),
    IV: 'NeedToEnough'
}

// module.exports = {
//     MONGO_DB_URI: 'mongodb+srv://illiaB:QazwSxedC123465@cluster0.lcj0o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//     JWT_KEY: 'jwt-secret-key',
//     IV: 'NeedToEnough',
//     AES_ENC_KEY: encryptGCM(crypto.randomBytes(256/8), parseFileJSON(), 'NeedToEnough'),
//     AES_JSON_KEY: parseFileJSON()
// }
//
// function parseFileJSON() {
//     const JSONParsed = JSON.parse(JSON.stringify(data));
//     return JSONParsed.KeyText;
// }

