const user = require("../models/file")

module.exports.uploadFile = async (req, res, next) => {
    res.json(req.file)
}

