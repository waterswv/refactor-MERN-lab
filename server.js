'use strict'

//import dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    db = require('./models');

//create instances
var app = express(),
    router = express.Router();

// set port to env or 3000
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://localhost/mern-comment-box');

//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//set route path and init API
router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});

// delete all comments
router.route('/nuke').get(function(req,res){
  db.Comment.remove(function(err,succ){
  res.json(succ);
  });
});

//adding the /comments route to our /api router
router.route('/comments')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    db.Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(comments)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var comment = new db.Comment();
    //body parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });

//adding the /comments/:comment_id route to our /api router
router.route('/comments/:comment_id')
//The put method gives us the chance to update our comment based on the ID passed to the route
.put(function(req, res) {
  db.Comment.findById(req.params.comment_id, function(err, comment){
    if (err)
    res.send(err);

    (req.body.author) ? comment.author = req.body.author : null;
    (req.body.text) ? comment.text = req.body.text : null;

    comment.save(function(err) {
      if (err)
      res.send(err);
      res.json({ message: 'Comment has been updated!'});
    });
  })
})
  //delete method for removing a comment from our database
.delete(function(req, res) {
  //selects the comment by its ID, then removes it.
  db.Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
    if (err)
      res.send(err);
    res.json({ message: 'Comment has been deleted' })
  })
});

//use router config when we call /API
app.use('/api', router);

//start server
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
