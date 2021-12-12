const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const JWT_KEY = require("../config/keys").JWT_KEY
const User = require('../models/User')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = JWT_KEY

module.exports.call = function (passport) {
    passport.use(new JwtStrategy(options, async function (jwt_payload, done) {
        try {
            await User.findOne({_id: jwt_payload.user}, function (err, user) {
                if (err) {
                    return done(err, false)
                }
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            }).select('email user')
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }))
}

// module.exports = function(passport) {
//     passport.use(new JwtStrategy(options, function(jwt_payload, done) {
//         User.findById( jwt_payload.sub, function(err, user) {
//             if (err) {
//                 return done(err, false);
//             }
//             if (user) {
//                 done(null, user);
//             } else {
//                 done(null, false);
//             }
//         });
//     }));
// };
