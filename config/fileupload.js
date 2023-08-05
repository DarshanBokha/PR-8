const multer = require('multer')

const path = require('path')

const uploads = path.join('uploads')

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,uploads)
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const fileupload = multer({storage : storage}).single('image')

module.exports = fileupload;