var express = require('express');
var nodejieba = require("nodejieba");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

var queryParser = bodyParser.text();
nodejieba.load({
  dict: './dict/dict.txt.big',
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
    res.status(404);
});

app.post('/cut', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var result = nodejieba.cut(req.body.data);
  //console.log(result);
  res.json(result);
});

app.post('/cutTrue', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var result = nodejieba.cut(req.body.data, true);
  res.json(result);
});

app.post('/cutHMM', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var result = nodejieba.cutHMM(req.body.data);
  res.json(result);
});

app.post('/cutAll', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var result = nodejieba.cutAll(req.body.data);
  res.json(result);
});

app.post('/cutForSearch', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var result = nodejieba.cutForSearch(req.body.data);
  res.json(result);
});

app.post('/tag', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var result = nodejieba.tag(req.body.data);
  res.json(result);
});

app.post('/extract', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var result = nodejieba.extract(req.body.data, req.body.topk);
  res.json(result);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Error');
});

module.exports = app;
