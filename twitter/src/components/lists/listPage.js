import React from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import '../../pages/home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../search/search.js';
import Lists from './lists';
import '../../pages/home/tweet.css';
import {Redirect} from 'react-router'

let redirectVar=null;
class ProfileTopBar extends React.Component {

  render(){
    return(
      <div className = "ProfileBar">
        <div>
          <Button className = "BarTitle"> <h3>Lists | {localStorage.getItem('userHandle')}</h3></Button>
        </div>
      </div>
    )
  }
}

function ListPage() {
  if(!localStorage.getItem('email')){
    redirectVar = <Redirect to= "/"/>
}
  return (
    <div className="Home">
      {redirectVar}
      <div className="Home-Navigation">
        <Navigation />
      </div>

      <ProfileTopBar />

      <div className="Home-Home">
        <div className="Home-Home-Card" jumbotron-fluid>
            <Lists />
        </div>
      </div>

      <div className="Home-RightSide">
        <RightSide />
      </div>
    </div>
  );
}

export default ListPage;
