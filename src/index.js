const express = require('express')
const cors = require('cors')
const imagesRouter = require('./routers/imagesRouter')

const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())
app.use(imagesRouter)

app.use('/', (req, res) => {
    res.send('ok')
})

app.listen(port, () => {
    console.log('Sever is up on port: ' + port)
})
