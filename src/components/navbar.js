import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap'
import UserContext from '../context/UserContext';

export default function Navigation () {
    const { userData, setUserData } = useContext(UserContext);

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
        window.location = '/login'
    }
    
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">App Tracker</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Overview</Nav.Link>
                <Nav.Link href="/add">Add</Nav.Link>
            </Nav>
            { 
                userData.user ? (
                    <a><Button onClick={logout} variant="info">Logout</Button></a>
                ) : (
                    <div>
                        <a href="/login" className="mr-2"><Button variant="info">Login</Button></a>
                        <a href="/register"><Button variant="outline-info">Register</Button></a>
                    </div>
                )
            }
            
        </Navbar>
    )
    
}