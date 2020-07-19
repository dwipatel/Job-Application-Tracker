import React, { Component } from "react";
import axios from "axios";
import { Alert, Form, Col, Row } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: "",
      isValid: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value })
  }
  onChangePassword(e) {
      this.setState({ password: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {
        username: this.state.username,
        password: this.state.password,
    }
    axios.post("http://localhost:5000/users", user)
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
        this.setState({
            isValid: false,
        })
      });
    e.preventDefault();
  }

  render() {
    return (
        <div className="mt-5">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" onChange={this.onChangeUsername} required/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} required/>
                </Form.Group>
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
                {this.state.isValid ? 
                    null : ( 
                    <Alert variant={'danger'}>
                        One of the following errors has occured:
                        <li>Username already in use</li>
                        <li>Password must be more than 3 characters</li>
                        <li>Password is invalid</li>
                        <li>Password Confirmation does not match</li>
                    </Alert>
                    )
                }
            </Form>
        </div>
    );
  }
}