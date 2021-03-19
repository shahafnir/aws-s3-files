const express = require('express')
const { uploadImageToS3 } = require('../middleware/s3-handlers')

const router = new express.Router()

router.post('/upload-image', uploadImageToS3, async (req, res) => {
    console.log(req.file)
    if (!req.file) {
        res.status(422).send({
            //422- file not arrived
            code: 420,
            message: 'File not uploaded',
        })
    }

    res.send()
})

// router.get('/get-images')

// router.delete('/delete-image', uploadImageToS3)

module.exports = router
