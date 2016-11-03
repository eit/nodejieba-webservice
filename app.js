var express = require('express');
var nodejieba = require("nodejieba");
var bodyParser = require('body-parser');

var app = express();
var queryParser = bodyParser.text();
nodejieba.load({
  dict: './dict/dict.txt.big',
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/cut', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var result = nodejieba.cut(req.body.data);

  console.log(result);
  //res.writeHead(200, {"Content-Type": "application/json"});
  res.json(result);
});

app.post('/cutTrue', queryParser, function (req, res) {
  var result = nodejieba.cut(req.body, true);
  res.json(result);
});

app.post('/cutHMM', queryParser, function (req, res) {
  var result = nodejieba.cutHMM(req.body);
  res.json(result);
});

app.post('/cutAll', queryParser, function (req, res) {
  var result = nodejieba.cutAll(req.body);
  res.json(result);
});

app.post('/cutForSearch', queryParser, function (req, res) {
  var result = nodejieba.cutForSearch(req.body);
  res.json(result);
});

app.post('/tag', queryParser, function (req, res) {
  var result = nodejieba.tag(req.body);
  res.json(result);
});

app.post('/extract', queryParser, function (req, res) {
  var topN = 5;
  var result = nodejieba.extract(req.body, topN);
  res.json(result);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Error');
});

module.exports = app;
