import React, { Component } from 'react';
import PostJobs from './postJob.js'
import ViewStudents from './viewStudents.js'
import Profile from './profile.js'
import ShowJobs from './allJobs.js'
import * as firebase from 'firebase'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Company extends Component {

    constructor() {
        super()
        this.state = {
            users: []
        }
    }


    componentWillMount() {
        const auth = firebase.auth();

        auth.onAuthStateChanged(() => {
            const userId = auth.currentUser.uid;
            if (auth.currentUser) {

                const userRef = firebase.database().ref().child('users/' + userId);
                userRef.on('value', snap => {
                    var userInfo = snap.val();
                    var newUser = [];
                    for (let key in userInfo) {
                        newUser.push(userInfo[key])
                    }
                    this.setState({
                        users: newUser
                    })

                })
            }
        }
        )
    }
    render() {
        return (
            <div> <h1>Company portal</h1>
                <Router>
                    <div>
                        <ul className="nav nav-tabs">
                            {/* <li role="presentation"><Link to="/profile">View Profile</Link></li> */}
                            <li role="presentation"><Link to="/allStudents">View Resume</Link></li>
                            <li role="presentation"><Link to="/postJob">Post Job</Link></li>
                            <li role="presentation"><Link to="/allJobs">View Jobs</Link></li>

                        </ul>
                        <div className="pannel">
                            <Route path="/allStudents" component={ViewStudents} />
                            <Route exact path="/profile" component={Profile} />
                            <Route path="/postjob" component={PostJobs} />
                            <Route path="/allJobs" component={ShowJobs} />
                        </div>
                    </div>
                </Router>
                <Profile />

            </div>

        )
    }
}
export default Company;