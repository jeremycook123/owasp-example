import React, { Component } from 'react';
import Splash from './Splash';
import { Login2 } from './Login2';
import {Row, Col} from 'react-bootstrap';

class InsecureApp extends Component {
  render () {    
    return (
      <div class="col-md-8 offset-md-2">
        <Row className="landing">
          <Col ><Splash/></Col>
          <Col ><Login2/></Col>
        </Row>
      </div>
    );
  }
}

//Cexport the VoteApp class, allows the ReactDOM.render within the index.js file to use it
export default InsecureApp;