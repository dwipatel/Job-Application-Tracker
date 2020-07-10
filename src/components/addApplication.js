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
    }

    render() {
        return(
            <Form className="mt-5">
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Company</Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue="email@example.com" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Title</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="title" />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Link</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="link" />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Notes</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="notes" />
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
        )
    }
}

