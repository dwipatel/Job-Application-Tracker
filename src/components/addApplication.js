import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Form, Row, Col } from "react-bootstrap";
import axios from 'axios';

export default class AddApplication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: '',
            title: '',
            link: '',
            date: new Date(),
            notes: '',
        }
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
            localStorage.setItem("auth-token", "");
            token = "";
            window.location = '/login'
        }
        else if (token === "") {
            window.location = '/login'
        }
    }

    onChangeCompany(e) {
        this.setState({ company: e.target.value })
    }
    onChangeTitle(e) {
        this.setState({ title: e.target.value })
    }
    onChangeLink(e) {
        this.setState({ link: e.target.value })
    }
    onChangeDate(date) {
        this.setState({ date: date })
    }
    onChangeNotes(e) {
        this.setState({ notes: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem("auth-token");

        const application = {
            company: this.state.company,
            title: this.state.title,
            link: this.state.link,
            date: this.state.date,
            notes: this.state.notes,
        }
      
        console.log(application);

        axios.post('http://localhost:5000/applications/add', application, { headers: {"x-auth-token": token} })
            .then(res => console.log(res.data));

        window.location = 'Job-Application-Tracker/';
    }


    render() {
        return(
            <div>
                <h3 className="mt-5">Create Application</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Company</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="company" onChange={this.onChangeCompany}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Title</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="title" onChange={this.onChangeTitle}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Link</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="link" onChange={this.onChangeLink}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Notes</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="notes" onChange={this.onChangeNotes}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Date</Form.Label>
                        <Col sm="10">
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                        </Col>
                    </Form.Group>
                    <div className="form-group mt-5">
                        <input type="submit" value="Create Application Log" className="btn btn-primary" />
                    </div>
                </Form>
            </div>
        )
    }
}

