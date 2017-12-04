var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var fibonacci = require('../models/fibonacci');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/mathapp';

router.get('/', function (req, res) {
    res.render('index', { user : req.user, title : 'Home' });
});

router.get('/register', function(req, res) {
    res.render('register', { title : 'Register'});
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user, title : 'Login' });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/theory', function(req, res) {
    res.render('theory', { user : req.user, title : 'Theory' });
});

router.get('/method', function (req, res) {
    res.render('method', { user : req.user, title : 'Method' });
});

router.post('/numfib', function(req, res) {
    if(!req.user)
    {
        res.redirect('/');
    }
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var myobj = { username: req.user, index : req.body.index, result : fibonacci.numFib(req.body.index), date : Date() };
      db.collection("users_history").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
    res.render('method', {title : 'Method', output : fibonacci.numFib(req.body.index), index : req.body.index, user : req.user});
});


router.get('/history', function (req, res) {
    MongoClient.connect(url, function(err, db) {
            if (err) throw err; 
            db.collection("users_history").find({username : req.user}).toArray(function(err, docs){
                if(err) res.json(err);
                else    res.render('history', { user : req.user, title : 'History', users : docs })
                console.log(docs.index);
        });
    });
});

router.get('/links', function (req, res) {
    res.render('links', { user : req.user, title : 'Links' });
});

module.exports = router;
