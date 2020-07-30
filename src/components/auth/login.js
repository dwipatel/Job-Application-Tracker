import React, { Component, useContext, useState } from "react";
import axios from "axios";
import { Alert, Form } from 'react-bootstrap';
import UserContext from '../../context/UserContext';

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [valid, setValid] = useState({isValid: true});
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     username: "",
  //     password: "",
  //     loginErrors: "",
  //     isValid: true,

  //   };

  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.onChangeUsername = this.onChangeUsername.bind(this);
  //   this.onChangePassword = this.onChangePassword.bind(this);
  // }

  // onChangeUsername(e) {
  //   this.setState({ username: e.target.value })
  // }
  // onChangePassword(e) {
  //     this.setState({ password: e.target.value })
  // }

  const { setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { username, password };
      const loginRes = await axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      window.location = '/'
    } catch (err) {
      setValid({
        isValid: false,
      })
    }
  }

  // handleSubmit(e) {
  //   e.preventDefault();

  //   const { setUserData } = useContext(UserContext);
  //   const user = {
  //       username: this.state.username,
  //       password: this.state.password,
  //   }
  //   axios.post("http://localhost:5000/login", user)
  //     // .then(response => {
  //     //   if (response.data.logged_in) {
  //     //     this.props.handleSuccessfulAuth(response.data);
  //     //   }
  //     // })
  //     .then(response => {
  //       setUserData({
  //         token: response.data.token,
  //         user: response.data.user,
  //       })
  //       localStorage.setItem("auth-token", response.data.token);
  //       window.location = '/'; 
  //     })
  //     .catch(error => {
  //       console.log("login error", error);
  //       this.setState({
  //           isValid: false,
  //       })
  //     });
  // }

  
  return (
      <div className="mt-5">
          <Form className="form" onSubmit={submit}>
              <Form.Group controlId="formGroupEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} required/>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
              </Form.Group>
              <div className="form-group">
                  <input type="submit" value="Login" className="btn btn-primary" />
              </div>
              {valid.isValid ? 
                  null : ( 
                  <Alert variant={'danger'}>
                      One of the following errors has occured:
                      <li>Invalid credentials</li>
                      <li>Account not registered</li>
                  </Alert>
                  )
              }
          </Form>
      </div>
  );
  
}