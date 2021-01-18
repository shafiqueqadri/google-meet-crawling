const express = require('express')
const path = require("path");
const app = express()
const transcriptRouter = require('./router/transcript.route');
require('./models/index');

app.use(express.static(__dirname + '/'));
// app.use(bodyParser.urlencoded({extend:true}));
// app.engine('html', require('hbs').renderFile);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.use('/transcript', transcriptRouter)
app.listen(process.env.PORT)