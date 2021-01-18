const express = require('express')
const app = express()
const transcriptRouter = require('./router/transcript.route');
require('./models/index');
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.use('/transcript', transcriptRouter)
app.listen(process.env.PORT)