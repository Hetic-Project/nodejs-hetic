const express = require("express")
const router = express.Router()
const authController = require("../controllers/authentification")
const uploadFileController = require("../controllers/uploadFile")
// const getFilesController = require("../controllers/getFiles")

const multer = require('multer')
const storage= multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'backend/upload')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })


router.get("/", (req, res, next) => {
    res.send("Root")
})

router.post("/login", authController.login)
router.post("/register", authController.register)

// router.get("/allFiles", getFiles.getFiles)
router.post("/upload", upload.single('file'), uploadFileController.uploadFile)

module.exports=router