var express = require('express');
var app = express();
var path = require('path');
var shakespeare = require('shakespeare-insult');

app.use(express.static(path.resolve(__dirname)));

const set = new Set();

while (set.size < 1000) {
  set.add(shakespeare.random());
}

const elements = [...set];

function isPrefix(prefix, word) {
  return word.toLowerCase().slice(0, prefix.length) === prefix.toLowerCase();
}

function filteredElements(query) {
  const filtered = elements.filter(el => isPrefix(query, el));
  return filtered;
}

app.use('/elements', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var response = filteredElements(req.query.value);
  res.send(JSON.stringify(response));
});

app.use('/', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3000);
