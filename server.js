var app = require('./express');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(app.express.static(__dirname + '/public'));

require("./project/app");

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('That minions attack is over ' + port + '!');
});
