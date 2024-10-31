const user = require("../models/file")

module.exports.uploadFile = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('no file uploaded')
    }
    res.send(`file uplaoded: ${req.file.originalname}`)
    // res.json(req.file)
}

