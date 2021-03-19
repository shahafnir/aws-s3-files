const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new AWS.S3({ region: process.env.AWS_REGION })

const fileStorage = multerS3({
    s3,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: 'inline',
    bucket: process.env.S3_BUCKET,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName =
            'images/' + new Date().getTime() + '-' + file.originalname
        cb(null, fileName)
    },
})

const uploadImageToS3 = multer({ storage: fileStorage }).single('image')

module.exports = { uploadImageToS3 }
