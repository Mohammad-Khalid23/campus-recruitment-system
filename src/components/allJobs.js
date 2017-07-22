import React, { Component } from 'react';
import * as firebase from 'firebase'
import PostJob from './postJob.js'
import '../App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';





class ShowJobs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            check: null,
            jobs: [],
            applierInfo: null,
            keys: null,
            userType: null
        }
    }
    componentWillMount() {
        const auth = firebase.auth();
        auth.onAuthStateChanged(() => {
            if (auth.currentUser) {
                const userId = firebase.auth().currentUser.uid;
                const userRef = firebase.database().ref().child('users/' + userId);
                userRef.on('value', snap => {
                    var userInfo = snap.val();
                    var newUser = [];
                    for (let key in userInfo) {
                        newUser.push(userInfo[key])
                    }
                    var userType = newUser[0].type; // user type 
                    this.setState({
                        userType: userType
                    })
                    var applier = {
                        userName: newUser[0].name, // user name
                        userEmail: newUser[0].email // user email
                    }
                    this.setState({
                        applierInfo: applier

                    })
                    console.log(this.state.applierInfo, "info")
                    console.log(newUser[0].name, "new name")


                    if (userType === "student" || userType === 'admin') {
                        const rootRef = firebase.database().ref('jobs');
                        rootRef.on('value', snap => {
                            var obj = snap.val()
                            var job = []; // take all job w.r.t uniq code
                            var jobKeys = [];
                            for (let key in obj) {
                                jobKeys.push(key)
                                job.push(obj[key])
                            }

                            console.log(job, "job value")
                            if (userType === 'student') {
                                this.setState({
                                    jobs: job,
                                    check: 'student',
                                    keys: jobKeys
                                })
                            } else {
                                this.setState({
                                    jobs: job,
                                    check: 'admin',
                                    keys: jobKeys
                                })
                            }
                        })

                    } else if (userType == "company") {
                        firebase.database().ref('jobs').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value').then((snap) => {
                            var obj = snap.val()
                            var job = [];
                            var jobKeys = []
                            for (let key in obj) {
                                jobKeys.push(key)
                                job.push(obj[key])
                            }
                            this.setState({
                                jobs: job,
                                check: 'company',
                                keys: jobKeys
                            })
                        })
                    }
                })
            }
        })
    }



    apply(index) {
        const targetJob = firebase.database().ref('jobs/' + this.state.keys[index] + '/apply/' + firebase.auth().currentUser.uid)
        targetJob.set(this.state.applierInfo)
    }
    delete(index) {
        const deleteJob = firebase.database().ref('jobs/' + this.state.keys[index])
        deleteJob.remove();
        console.log("deleting")
    }


    render() {
        return (
            <div className="jobDiv">
                <h1>Jobs</h1>
                {this.state.jobs.map((job, index) => (
                    <div key={index}>
                        <ul >
                            <li><strong>Job Title: </strong>
                                {job.name} <br />
                                <strong>Job Type: </strong>
                                {job.type} <br />
                                <strong>Job Qualification: </strong>
                                {job.qualification} <br />
                                <strong>Job Salary: </strong>
                                {job.salary}<br />
                                <strong>Job Experience: </strong>
                                {job.experience}<br />
                            </li>
                            {(this.state.check) === 'student' ?
                                <button className="btn btn-primary" onClick={this.apply.bind(this, index)}>Apply</button>
                                : null}
                            {(this.state.check) === 'admin' ?
                                <button className="btn btn-danger" onClick={this.delete.bind(this, index)}>Delete</button>
                                : null}
                            {(this.state.userType) === "company" ?
                                <Applicant keys={this.state.keys} index={index} />
                                : null
                                }

                        </ul>
                    </div>
                ))}
            </div>

        )

    }
}

class Applicant extends Component {

    constructor() {
        super()
        this.state = {
            applier: []
        }
    }

    componentDidMount() {
        var root = firebase.database().ref('jobs/' + this.props.keys[this.props.index])
        if (root.child('apply')) {
            root.child('apply').on('value', snap => {
                var obj = snap.val();
                let applier = [];
                for (let key in obj) {
                    applier.push(obj[key])
                }
                this.setState({
                    applier: applier
                })
                console.log(this.state.applier)
            })
        }
    }
    render() {
        return (
            <div className="">
                {this.state.applier.length ?
                    <div>
                        <h2>Applicants</h2>
                        {this.state.applier.map((data, index) => (
                            <div className="appDiv" index={index}>
                                {this.state.applier.length ?
                                    <span className="applicants" ><strong>Name:</strong>{data.userName} <br />
                                        <strong>Email:</strong>{data.userEmail}</span> :
                                    <span><strong>No Applicant</strong></span>
                                }
                            </div>
                        ))}
                    </div>
                    : <ul><li>No Applicants</li></ul>}
            </div>
        )
    }


}


export default ShowJobs;