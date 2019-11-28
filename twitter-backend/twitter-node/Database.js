let mongoose = require('mongoose');

const connectionString='mongodb+srv://root:root@cluster0-9j3qi.mongodb.net/twittertest?retryWrites=true&w=majority'
mongoose.createConnection(connectionString,{poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} );
// Email, Pwd, Name, Bio, Location, Website,
//  BirthDate, ProfileImage, CoverImage, Tweets(Array), Followers(Array),
//  Following(Array), BookmarkedTweets (Array), Messages (Array)
  

////// Profile Schema
var profileSchema = new mongoose.Schema({
	tweets:Array,
	followers:Array,
	following:Array,
	bookmarkedTweets:Array,
	chats:Array,
	likedTweets: Array,
	userHandle: String

})
/////Message Schema
const messageSchema = new mongoose.Schema(
	{
		message: String,
		senderId: mongoose.Schema.Types.ObjectId,
		receiverId: mongoose.Schema.Types.ObjectId,
		time : { type : Date, default: Date.now }
	},
	{
		time : { type : Date, default: Date.now }
	}
);
//////Chat Schema
const chatSchema = new mongoose.Schema(
    {	
		users:Array,
        messages : [messageSchema]
    },
    {
		collection : 'chats',
		time : { type : Date, default: Date.now }
    }
);



var profileModel = mongoose.model('profile', profileSchema);
////////////////////////////////////////////////////////////////////////////////


const chatSchema = new mongoose.Schema(
    {	
		users:Array,
        messages : [messageSchema]
    },
    {
		collection : 'chats',
		time : { type : Date, default: Date.now }
    }
);

const chat = mongoose.model('chat', chatSchema);
const message = mongoose.model('message',messageSchema);

////////////////////////////////////////////////////////////////////////////////

var tweetHashSchema = new mongoose.Schema({
    hashData:[]
})
var tweetHashModel = mongoose.model('tweethash', tweetHashSchema);

module.exports = {
  Profile:profileModel,
  Chat: chat,
  Message :message,
  TweetHash:tweetHashModel

}