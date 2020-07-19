import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import FrontPage from './components/overviewPage';
import AddPage from './components/addApplication';
import EditPage from './components/editApplication';
import Register from './components/auth/register';
import LoginPage from './components/loginPage';

export default class App extends Component{
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar/>
          <Route path="/" exact component={FrontPage}/>
          <Route path="/add" component={AddPage}/> 
          <Route path="/edit/:id" component={EditPage}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={LoginPage}/>
        </div>
      </Router>
    );
  }  
}