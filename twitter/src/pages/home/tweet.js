import React from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import logo from '../../svg/logo.svg';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';

import {Redirect} from 'react-router';

import like from '../../svg/like.jpeg';
import retweet from '../../svg/retweet.jpeg';
import comment from '../../svg/comment.jpeg';
//import option from '../../svg/option.jpeg';
import bookmark from '../../svg/bookmark.jpeg';

import NotificationAlert from 'react-notification-alert';
import "react-notification-alert/dist/animate.css";

import retweet from '../../svg/retweet.jpeg';
import comment from '../../svg/comment.jpeg';
//import option from '../../svg/option.jpeg';
import bookmark from '../../svg/bookmark.jpeg';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

let otherTweets=[];

var retweete = {};
retweete = {
    place: 'tc',
    message: (
        <div>
            <div>
            <p align="center">Tweet Retweeted successfully! </p>
            </div>
        </div>
    ),
    type: "warning",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 3
}

var likeTweet = {};
likeTweet={
  place: 'tc',
  message: (
      <div>
          <div>
             <p align="center">Tweet Liked!</p>
          </div>
      </div>
  ),
  type: "warning",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 3
}

var bookmarktweet = {};
bookmarktweet={
  place: 'tc',
  message: (
      <div>
          <div>
             <p align="center">Tweet Bookmarked successfully!</p>
          </div>
      </div>
  ),
  type: "warning",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 3
}
class Tweet extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        reDirect:""
      }
      let data = '5de03cd0b5ad6906843d79d2';
      let token=localStorage.getItem('bearer-token');
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.get('http://localhost:3001/profile/getAllTweets/'+localStorage.getItem('id'), {params:{}, mode:'no-cors'})
        .then((response) => {
            // alert('success')
            console.log('response othertweets',response.data)
            otherTweets=response.data;
            this.setState({})
        })
        .catch(()=>{console.log('error')})
        this.addReply = this.addReply.bind(this);
    }

    myFunc(){
      this.refs.notify.notificationAlert(retweete);
  }

  loadTweet = (tid)=>{
    localStorage.setItem('tweetloadid',tid)
    let reDirect= <Redirect to={{
      pathname: '/loadTweet'
  }}
  />
  
  this.setState({
  reDirect:reDirect
  })
  }
  
  showAddReply(id){
    //console.log(id);
    var rows = document.getElementsByName(id);
    //console.log(e.target.value);
    for( let row of rows){
        //console.log(row);
        if (row.style.display === "none") {
        row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
  }

  addReply(e){
    //console.log(e.target.value);
    var message = document.getElementById(e.target.value).value;
    //console.log(message);
    axios.defaults.withCredentials = true;
    let data = {
      "tweetId":e.target.value,
      "userHandle":localStorage.getItem('userHandle'),
      "reply" : message,
    };
    axios.post('http://localhost:3001/users/tweet/reply',data)
    .then(response => {
        console.log(JSON.stringify(response.data));
        if(response.status === 200){
          alert("Reply Added");
          window.location.reload();
        }else{
            console.log(response.data);
        }
    })
    .catch(error=>{
        console.log("Error: "+JSON.stringify(error));
        
    }
    );
}

    likeTweet = (tweetid)=>{
      let data = {tweetId:tweetid,likedBy:localStorage.getItem('userHandle'),id:localStorage.getItem('id')}
      console.log('Tweet like data is:',data)
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post('http://localhost:3001/users/tweet/like',data)
        .then((response) => {
            // alert('success')
            console.log('response othertweets',response.data)
            otherTweets=response.data;
            this.refs.notify.notificationAlert(likeTweet);
            window.location.reload();
           
        })
        .catch(()=>{console.log('error')})
    }

    retweetTweet = (twt)=>{
      let data = {tweet:twt.tweet, id:localStorage.getItem('id'), name:localStorage.getItem('name'),originalTweetOwner:twt.orignalHandle};
     // let data = {tweetId:tweetid,likedBy:localStorage.getItem('userHandle'),id:localStorage.getItem('id')}
      console.log('Tweet retweet data is:',data)
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post('http://localhost:3001/users/tweet/retweet',data)
        .then((response) => {
            // alert('success')
            console.log('response othertweets',response.data)
            otherTweets=response.data;
            this.refs.notify.notificationAlert(retweete);
           window.location.reload();
           
        })
        .catch(()=>{console.log('error')})
    }

    bookmarkTweet = (twt)=>{
      let data = {tweet_id:twt, id:localStorage.getItem('id')};
     // let data = {tweetId:tweetid,likedBy:localStorage.getItem('userHandle'),id:localStorage.getItem('id')}
      console.log('Tweet bookmarkTweet data is:',data)
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post('http://localhost:3001/users/bookmark',data)
        .then((response) => {
            // alert('success')
            console.log('response othertweets',response.data)
            otherTweets=response.data;
            this.refs.notify.notificationAlert(bookmarktweet);
           window.location.reload();
        })
        .catch(()=>{console.log('error')})
    }

    render() {
     
      return(
        <div className = "tweetCard">
           <NotificationAlert ref="notify" /> 
           {this.state.reDirect}
            {otherTweets.map((twt, index) =>
                <div className="tweetCard-indi">
                  <div className="Tweet-Image">
                    <br/>
                    <img className="image" src={twt.image}/>
                  </div>
                  <div className="Tweet-Body">
                    <br/>
                    <div className="Tweet-Body-Content">
                      <h5 className="Tweet-Body-Name">{twt.name}</h5>
                      <p className="Tweet-Body-Handle">{twt.userHandle}</p>
                      <p className="Tweet-Body-Date">{twt.date}</p>
                    </div>
                    <div>
                      <p className="Tweet-Body-Text">{twt.tweet}</p>
                    </div>
                    <div className="Tweet-Body-Panel">
                    <button className="Tweet-Body-Panel-Comment" onClick = {this.showAddReply.bind(this,twt.tweetId)}><img src={comment}/></button>
                      <button className="Tweet-Body-Panel-ReTweet" onClick={()=>this.retweetTweet(twt)}><img src={retweet}/></button>
                      <button className="Tweet-Body-Panel-Like" onClick={()=>this.likeTweet(twt.tweetId)}><span color="white" id="likec">{twt.likes}</span><img src={like}/></button>
                      <button className="Tweet-Body-Panel-Bookmark" onClick={()=>this.bookmarkTweet(twt.tweetId)}><img src={bookmark}/></button>
                      <button className="btn btn-primary" onClick={()=>this.loadTweet(twt.tweetId)}>View Tweet</button>
                      <br/>
                      <br/>
                      <br/>
                    </div>
                    <div style = {{display:"none"}} name = {twt.tweetId}>
                      <textarea rows="4" cols="50" placeholder = "Reply to this tweet......" id = {twt.tweetId} name ="tweetReply" /> <br/>
                      <button onClick = {this.addReply} value = {twt.tweetId}>Send</button>
                    </div>
                  </div>
                </div>
            )}
        </div>
      );
    }
  }

export default Tweet;
