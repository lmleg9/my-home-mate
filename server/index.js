const express = require('express')
const app = express()
const routes = require('./router.js')
const cors = require('cors')


app.use(cors())
app.use(express.json());
app.use('/', routes)


const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})