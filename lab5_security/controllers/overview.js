const User = require('../models/User')
const handler = require('../utils/errorHandler')

module.exports.overview = async function (req, res) {
    try {
        const userInfo = await User.findById( req.params.id)
        res.status(200).json(userInfo);
    } catch (err) {
        handler.handleError(res, err)
    }
}

