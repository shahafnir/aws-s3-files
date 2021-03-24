const express = require('express')
const { Readable } = require('stream')
const {
    uploadImageToS3,
    deleteImageFromS3,
    getImageFromS3,
} = require('../middleware/s3-handlers')
const Image = require('../models/imageModel')

const router = new express.Router()

router.post('/upload-image', uploadImageToS3, async (req, res) => {
    if (!req.file) {
        res.status(422).send({
            code: 420,
            message: 'File not uploaded',
        })
    }

    const image = new Image({
        originalName: req.file.originalname,
        storageName: req.file.key.split('/')[1],
        bucket: process.env.S3_BUCKET,
        region: process.env.AWS_REGION,
        key: req.file.key,
    })

    try {
        await image.save()

        res.status(201).send(image)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/get-images', async (req, res) => {
    try {
        const images = await Image.find({})

        if (!images) res.send([])

        res.send(images)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/get-image', getImageFromS3, async (req, res) => {
    const imageName = req.query.name
    const stream = Readable.from(req.imageBuffer)
    res.setHeader('Content-Disposition', 'inline; filename=' + imageName)

    stream.pipe(res)
})

router.delete('/delete-image', deleteImageFromS3, async (req, res) => {
    const imageID = req.body.id

    try {
        const image = await Image.findByIdAndDelete(imageID)

        if (!image) {
            res.status(404).send()
        }

        res.send(image)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
