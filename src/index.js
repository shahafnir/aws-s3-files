const express = require('express')
const cors = require('cors')

require('./db/mongoose')
const port = process.env.PORT
const imagesRouter = require('./routers/imagesRouter')

const app = express()
app.use(express.json())
app.use(cors())
app.use(imagesRouter)

// app.use('/', (req, res) => {
//     res.send('ok')
// })

app.listen(port, () => {
    console.log('Sever is up on port: ' + port)
})
