import React, { Component } from 'react';
// import '../App.css';
import * as firebase from 'firebase'
import Header from './header.js'
import App from '../App';
import ViewStudents from './viewStudents.js'
import Profile from './profile.js'
import ShowJobs from './allJobs.js'


import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDom from 'react-dom';


class Admin extends Component {
    render() {
        return (
            <div> <h1>Admin portal</h1>
                <Router>
                    <div>
                        <ul className="nav nav-tabs">
                            <li role="presentation"><Link to="/allStudents">All Resume</Link></li>
                            <li role="presentation"><Link to="/allJobs">All Jobs</Link></li>
                            {/*<li role="presentation"><Link to="/allJobs">View Jobs</Link></li>*/}
                        </ul>
                        <div className="pannel">
                            <Route path="/allStudents" component={ViewStudents} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/allJobs" component={ShowJobs} />
                        </div>
                    </div>
                </Router>
                <Profile />
            </div>
        )
    }
}
export default Admin;