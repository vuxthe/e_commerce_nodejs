import path from 'path'
import express from 'express'
import multer from 'multer'
import { protect } from '../middleware/authMiddleware.js'
import cloudinary from 'cloudinary'
// import "dotenv/config.js";
const router = express.Router()

cloudinary.config({
    cloud_name: "dsah3xvb7",
    api_key: "257114941866118",
    api_secret: "p8t1-xo4Q8NH1Y8UArlGX0Hc1Gc"
  });

const storage = cloudinary.v2.uploader.upload_stream({
  folder: 'product-images'
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})
router.post('/', protect, upload.single('image'), (req, res) => {
    if (req.file) {
      const buffer = req.file.buffer
      cloudinary.v2.uploader
        .upload_stream({ folder: 'product-images' }, (err, result) => {
          if (err) {
            console.log(err)
            res.status(500).json({ message: 'Failed to upload image' })
          } else {
            // res.status(201).json({ image: result.secure_url })
            res.send(`${result.secure_url}`)
          }
        })
        .end(buffer)
    } else {
      res.status(400).json({ message: 'Image required' })
    }
  })



export default router
