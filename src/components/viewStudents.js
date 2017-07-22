import React, { Component } from 'react';
import * as firebase from 'firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';




class ViewStudents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            resume: [],
            keys :[]
        }
    }

    componentWillMount() {
        const rootRef = firebase.database().ref('resume');
        rootRef.on('value', snap => {
            var obj = snap.val()

            var resume = [];
           var studentKeys =[];
            for (let key in obj) {
                studentKeys.push(key)
                resume.push(obj[key])
            }
            this.setState({
                resume: resume,
                keys : studentKeys
            })
        })
    }


// students resume can be delete by admin
    delete(index){
        const deleteJob = firebase.database().ref('resume/'+this.state.keys[index])
        deleteJob.remove();
        console.log("deleting")
    }


    render() {
        return (
            <div className="jobDiv">
                <h1>All Resume</h1>
                {
                    this.state.resume.map((data, index) => {

                        return (<ul key={index}>
                            <li><strong>Name: </strong>{data.name}<br />
                                <strong>Number: </strong>{data.number}<br />
                                <strong>Skills:</strong>{data.skills}<br />
                                <strong>Qualification: </strong>{data.qualification}<br />
                                <strong>Experience:</strong>{data.experience}<br />
                            </li>
                            <button className="btn btn-danger" onClick={this.delete.bind(this,index)}>Delete</button>
                        </ul>
                        )
                    })
                }
            </div>

        )

    }
}
export default ViewStudents;