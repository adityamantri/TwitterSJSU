import React from 'react';
import {Button} from 'reactstrap';
//import logo from '../../svg/logo.svg';
import './search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';
//import MagnifyingSearch from '../../svg/search_100px.svg';
import {Redirect} from 'react-router'
 
let searchHandler="", redirectFlag=false, redirectVar=null
class RightSide extends React.Component {
 searchHandler = (e) => {
   if (e.key === 'Enter') {
    redirectFlag=true;
     localStorage.setItem('otherUserHandle',searchHandler)
     this.setState({})
   }
 }
 searchTextHandler=(e)=>{
   searchHandler=e.target.value
 }
 render(){
   if(redirectFlag)
   {
     redirectVar=<Redirect to="/otherProfilePage"/>
     redirectFlag=false;
   }
   return(
     <div className="search-div">
       {redirectVar}
       <div>
         <Form>
         <FormGroup>
           <Input className="search-bar" type="text" name="address" placeholder="Search a trend or person" onChange={this.searchTextHandler.bind(this)} onKeyDown={this.searchHandler}></Input>
         </FormGroup>
         </Form>
         {/* <input type="text"> Search People or Trends </input>*/}
       </div>
 
     </div>
   )
 }
}
 
export default RightSide;
 


