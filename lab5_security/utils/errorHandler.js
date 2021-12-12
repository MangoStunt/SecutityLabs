module.exports.handleError = function (res, error) {
    res.status(500).json({
        success: false,
        message: `Next error occured: ${error.me ? error.message : error}`
    })
}
