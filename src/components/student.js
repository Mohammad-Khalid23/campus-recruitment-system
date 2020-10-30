import React, { Component } from 'react';
import * as firebase from 'firebase'
import CreateResume from './createResume.js'
import UpdateResume from './updateResume.js'
import Profile from './profile.js'
import ShowJobs from './allJobs.js'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



class Students extends Component {
    constructor() {
        super()
        this.state = {
            has: null,
            users: []
        }
    }

    componentWillMount() {
        const auth = firebase.auth();

        auth.onAuthStateChanged(() => {
            const userId = auth.currentUser.uid;
            if (auth.currentUser) {
                const rootRef = firebase.database().ref('resume/' + userId); //check cv exist or not
                rootRef.on('value', snap => {
                    var resume = snap.val();
                    var exist = (resume !== null) // false if no value in data

                    if (exist === true) {
                        this.setState({
                            has: true
                        })
                    } else {
                        this.setState({
                            has: false
                        })
                    }
                })

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
        })
    }


    render() {
        return (
            <div> <h1>Student portal</h1>

                <Router>
                    <div>
                        <ul className="nav nav-tabs">
                            {/* <li role="presentation"><Link to="/profile">View Profile</Link></li> */}
                            {(this.state.has) === true ?
                                <li role="presentation"><Link to="/updateResume">Edit Resume</Link></li>
                                : <li role="presentation"><Link to="/resume">Create Resume</Link></li>
                            }
                            <li role="presentation"><Link to="/allJobs">View Jobs</Link></li>
                        </ul>
                        <div className="pannel">
                            <Route path="/resume" component={CreateResume} />
                            <Route path="/updateResume" component={UpdateResume} />
                            <Route exact path="/profile" component={Profile} />
                            <Route path="/allJobs" component={ShowJobs} />
                        </div>
                    </div>
                </Router>
                <div className="row">

                    <h1 className="profileHead">User Profile</h1>
                    {
                        this.state.users.map((data, index) => {

                            return <div className="userInfo" key={index}>
                                <p className="profileInfo"><strong>Name:</strong> {data.name} </p>
                                <p className="profileInfo"><strong>Email:</strong> {data.email} </p>
                                <p className="profileInfo"><strong>Number:</strong> {data.number} </p>
                            </div>


                        })
                    }
                </div>
            </div>
        )
    }
}
export default Students;