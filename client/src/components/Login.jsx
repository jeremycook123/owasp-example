import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

class Login extends Component{
    constructor (props) {
        super(props);
    
        //configure the APIHOSTPORT, this is the public IP address of the host that the API server is running on
        //this.APIHOSTPORT = `${window._env_.REACT_APP_APIHOSTPORT}`;
        this.APIHOSTPORT = "localhost:8080"

        this.state = {
          authenticated: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
      }

      handleSubmit = (event) => {
        event.preventDefault();

        //implement the handleClick function which will be called when the user clicks on the voting button
        //this invokes an AJAX request to the API to vote on the current programming language
        var url = `http://${this.APIHOSTPORT}/login`;

        console.log(event.target.elements.username.value);
        console.log(event.target.elements.password.value);

        axios.post(url, {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value
        }).then((response) => {
            var token = response.data.token;
            localStorage.setItem("token", token);
            this.setState({authenticated: true});

            const navigate = useNavigate();
            navigate("/comments");
        }).catch((err) => {
            console.log("access denied!!");
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <Form style={{width:"80%", marginLeft:"10%", marginTop:"10%"}} onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Label>Enter your email</Form.Label>
                        <Form.Control type="email" id='username'/>
                    </Form.Group>
                    <br/>
                    <Form.Group >
                        <Form.Label>Enter your password</Form.Label>
                        <Form.Control type="password" id='password'/>
                    </Form.Group>
                    <br/>
                    <Button type="submit">Login</Button>
                </Form>
            </div>
        )  
    }
}

export default Login;