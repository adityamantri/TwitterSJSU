var express = require('express');
var router = express.Router();
var passport = require("passport");
const kafka = require("../kafka/kafka/client");

//Bookmark the tweet
router.post('/bookmark',  function (req, res, next) {
    console.log('Inside bookmark kafka.');
     kafka.make_request('bookmark',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//Post Tweets
router.post('/tweet',  function (req, res, next) {
    console.log('Inside create tweet kafka.');
     kafka.make_request('tweet',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//Like Tweets
router.post('/tweet/like',  function (req, res, next) {
    console.log('Inside like tweet kafka.');
     kafka.make_request('likeTweet',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//Reply Tweet
router.post('/tweet/reply',  function (req, res, next) {
    console.log('Inside reply tweet kafka.');
     kafka.make_request('replyTweet',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});

//Retweet Tweet
router.post('/tweet/retweet',  function (req, res, next) {
    console.log('Inside retweet tweet kafka.');
     kafka.make_request('retweetTweet',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});


//Add Followers
//Retweet Tweet
router.post('/addFollowers',  function (req, res, next) {
    console.log('Inside add Followers kafka.');
     kafka.make_request('addFollowers',req.body, function(error,results){
        if (error) {
            console.log("error in results ");
            res.status(200).send(error)
        }
        else {
            res.status(200).send({response:true});
        };
    });
});


module.exports = router;
