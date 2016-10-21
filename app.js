var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require("mongojs");
var db = mongojs('catalog',['products']);


app.use(bodyParser.json());

app.get('/', function(req,res){
res.send('it works');
});

app.get('/products', function(req,res){
  console.log('Fetching Products');
  db.products.find(function(err,docs){
    if(err){
      res.send(err);
    } else {
      console.log("sending products");
      res.json(docs);
    }
  });
});

app.get('/products/:id', function(req,res){
  console.log('Fetching Product');
  db.products.findOne({_id:mongojs.ObjectId(req.params.id)},
    function(err,doc){
    if(err){
      res.send(err);
    } else {
      console.log("sending products");
      res.json(doc);
    }
  });
});



app.listen(3000);
console.log('server stsrted');
