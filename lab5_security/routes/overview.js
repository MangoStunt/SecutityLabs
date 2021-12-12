const express = require('express')
const passport = require('passport')
const controller = require('../controllers/overview')
const router = express.Router()

router.get('/user', passport.authenticate('jwt', {session: false}), controller.overview)

module.exports = router
