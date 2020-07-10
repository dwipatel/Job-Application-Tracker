import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap'

export default class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">App Tracker</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Overview</Nav.Link>
                    <Nav.Link href="/add">Add</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}