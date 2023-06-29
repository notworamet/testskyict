const express = require('express');
const route = require('./route');
var cors = require('cors');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const port = 80;
app.use(cors());
route.configure(app);

app.listen(port, () => {
  console.log('Server listening on port ' + port)
});