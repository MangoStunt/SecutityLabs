const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const handler = require('../utils/errorHandler')
const {decryptGCM, encryptGCM} = require("../config/aes256");
const {AES_ENC_KEY, IV} = require("../config/keys");

module.exports.login = async function (req, res) {
    const currUser = await User.findOne({email: req.body.email})

    if(currUser) {
        const passwordRes = bcrypt.compareSync(req.body.password, currUser.password)
        if (passwordRes) {
            const token = JWT.sign({
                email: currUser.email,
                user: currUser._id,
            }, keys.JWT_KEY, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`,
                user: {
                    name: currUser.name,
                    address: decryptGCM(currUser.address, AES_ENC_KEY, IV),
                    number: decryptGCM(currUser.number, AES_ENC_KEY, IV),
                },
            })
        } else {
            res.status(401).json({
                message: 'Invalid password. Try again another one'
            })
        }
    } else {
        res.status(404).json({
            message: 'There is no such user found. You can register to be able to log in'
        })
    }
}

module.exports.register = async function (req, res) {
    try {
    const regUser = await User.findOne({email: req.body.email})

    if (regUser) {
        res.status(409).json({
            message: 'Current Email is already in use. Try to use another one, or Log In'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password;
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            number: encryptGCM(req.body.number, AES_ENC_KEY, IV),
            address: encryptGCM(req.body.address, AES_ENC_KEY, IV),
            password: bcrypt.hashSync(password, salt),
        })

        try {
            await newUser.save()
            res.status(201).json(newUser)
        } catch (err) {
            handler.handleError(res, err)
        }

    }
    } catch (err) {
        handler.handleError(res, err)
    }
}
