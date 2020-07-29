import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import FrontPage from './components/overviewPage';
import AddPage from './components/addApplication';
import EditPage from './components/editApplication';
import Register from './components/auth/register';
import LoginPage from './components/loginPage';
import UserContext from './context/UserContext';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  //runs when app starts up
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = ""
      }
      const tokenRes = await axios.post("http://localhost:5000/users/tokenIsValid", 
        null, 
        { headers: {"x-auth-token": token} }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/",
          { headers: {"x-auth-token": token}, }
        );
        setUserData({
          token,
          user: userRes.data,
        })
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="container">
          <Navbar/>
          <Route path="Job-Application-Tracker/" exact component={FrontPage}/>
          <Route path="Job-Application-Tracker/add" component={AddPage}/> 
          <Route path="Job-Application-Tracker/edit/:id" component={EditPage}/>
          <Route path="Job-Application-Tracker/register" component={Register}/>
          <Route path="Job-Application-Tracker/login" component={LoginPage}/>
        </div>
      </UserContext.Provider>
    </Router>
  );
}