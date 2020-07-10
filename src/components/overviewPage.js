import React, { Component } from 'react';
import { BrowserRouter as Link, Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card } from 'react-bootstrap';
import axios from 'axios';

const Applications = props => (
    <tr>
        <td>{props.app.company}</td>
        <td>{props.app.title}</td>
        <td><a href={props.app.link}>{props.app.link}</a></td>
        <td>{props.app.date.substring(0,10)}</td>
        <td>{props.app.notes}</td>
        <td>
            <a href={"/edit/"+props.app._id}>edit</a> | <a href="#" onClick={() => { props.deleteExercise(props.app._id) }}>delete</a>
        </td>
    </tr>
)

export default class OverviewPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apps: [],
        }
        this.deleteApplication = this.deleteApplication.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:5000/applications/')
            .then(response => {
                this.setState({
                    apps: response.data,
                })
            })
    }

    deleteApplication(id) {
        axios.delete('http://localhost:5000/applications/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          apps: this.state.apps.filter(el => el._id !== id)
        })
    }

    applicationList() {
        return this.state.apps.map(currApps => {
          return <Applications app={currApps} deleteApplication={this.deleteApplication} key={currApps._id}/>;
        })
    }
    
    render() {
        return(
            <div>
                <Card 
                bg={'info'} 
                text={'white'} 
                style={{ width: '18rem' }} 
                className="mb-2" 
                className="mt-5"
                >
                    <Card.Header>Summary</Card.Header>
                    <Card.Body>
                        <Card.Title> Total Applications </Card.Title>
                        <Card.Text>
                            You have a total of {this.state.apps.length} applications
                        </Card.Text>
                    </Card.Body>
                </Card>
                <h3 className="mt-5">Applications</h3>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Position Title</th>
                            <th>Link</th>
                            <th>Date</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.applicationList()}
                    </tbody>
                </Table>
            </div>
        )
    }
}