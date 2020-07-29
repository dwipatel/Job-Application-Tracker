import React, { Component } from 'react';
import Login from './auth/login';
import Register from './auth/register';

export default class LoginPage extends Component {
    render() {
        return(
            <div>
                <Login/>
                <div>
                    <a href="Job-Application-Tracker/register"><input type="submit" value="Register" className="btn btn-primary" /></a>
                </div>
            </div>
        )
    }
}