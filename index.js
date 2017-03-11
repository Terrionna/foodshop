var express = require('express');
var server = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./secrets').mongoURI;

//powerup--middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//connect to the database
mongoose.connect(mongoURI);
//Create the mongoose Schema
var foodSchema = mongoose.Schema({
  price: Number,
  category: String,
  isGlutenFree: Boolean,
  calories: Number,
});
//Create Mongoose Model
var Food = mongoose.model('Food', foodSchema);
// Testing Database Stuff
// GET/foods
// GET/foods/:id
// GET/foods/category/:categoryName
server.get('/foods/category/:categoryName', function(req, res){
  Food.find({_id: req.params.id}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
  });
});
// Post/foods
server.post('/foods', function(req, res){
  res.send('It Works')
});
server.listen(port, function(){
  console.log('Now Listening on Port...', port);
})
