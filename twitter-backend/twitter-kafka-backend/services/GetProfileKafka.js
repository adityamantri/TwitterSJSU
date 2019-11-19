var db = require('../Database');
var profileModel = db.Profile;
// const pool = require('../db');
// var mongoose = require('mongoose');
​
function handle_request(msg, callback) {
    profileModel.find({ userHandle: msg.userHandle },
        function (error, results) {
            if (error) {
                console.log("error in Kafka GetProfile results ", error);
                callback(error, "Error")
            }
            else {
                console.log("kafka getProfile result ",results);
                callback(null, results);
            };
        });
​
};
exports.handle_request = handle_request;