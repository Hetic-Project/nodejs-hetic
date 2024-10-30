const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    originalName: {
        type: String
    },
    fileName: {
        type: String
    },
    size: {
        type: String
    }
});

const file = mongoose.model('file', fileSchema);

module.exports = file