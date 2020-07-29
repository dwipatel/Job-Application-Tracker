import React, { Component } from "react";
import axios from "axios";
import { Alert, Form, Col, Row } from 'react-bootstrap';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
      isValid: true,
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value })
  }
  onChangePassword(e) {
      this.setState({ password: e.target.value })
  }
  onChangePasswordConfirm(e) {
    this.setState({ password_confirmation: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.state.password === this.state.password_confirmation) {
      this.setState({
          isValid: true,
      })

      const user = {
          username: this.state.username,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
      }
      
      console.log(user);

      axios.post('http://localhost:5000/users/add', user)
      .then(response => {
          if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
          }
          console.log(response.data)
          window.location = '/login';
      })
      .catch(error => {
          console.log("registration error", error);
          this.setState({
            isValid: false,
          })
      });
    }
    else {
      this.setState({
        isValid: false,
      })
    }
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
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" onChange={this.onChangePasswordConfirm} required/>
          </Form.Group>
          <div className="form-group">
              <input type="submit" value="Create User" className="btn btn-primary" />
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
      
      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <input
      //       type="username"
      //       name="username"
      //       placeholder="username"
      //       value={this.state.username}
      //       onChange={this.handleChange}
      //       required
      //     />

      //     <input
      //       type="password"
      //       name="password"
      //       placeholder="Password"
      //       value={this.state.password}
      //       onChange={this.handleChange}
      //       required
      //     />

      //     <input
      //       type="password"
      //       name="password_confirmation"
      //       placeholder="Password confirmation"
      //       value={this.state.password_confirmation}
      //       onChange={this.handleChange}
      //       required
      //     />

      //     <button type="submit">Register</button>
      //   </form>
      //   <div>
      //     {this.state.isValid ? 
      //         null : ( 
      //           <Alert variant={'danger'}>
      //             One of the following errors has occured:
      //             <li>Username already in use</li>
      //             <li>Password must be more than 3 characters</li>
      //             <li>Password is invalid</li>
      //             <li>Password Confirmation does not match</li>
      //           </Alert>
      //         )
      //       }
      //   </div>
      // </div>
    );
  }
}