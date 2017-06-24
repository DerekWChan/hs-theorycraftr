var app = require('./express');
var bodyParser = require('body-parser');
var unirest = require('unirest');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(app.express.static(__dirname + '/public'));

require("./project/app.js");

var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('That minion\'s attack is over ' + port + '!');
});

unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/Murloc Tinyfin")
.header("X-Mashape-Key", "7IgAiQK5C5msh3xE6nKH4BYZGKihp1ZHiyejsn91ZKfHr3qHjg")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
