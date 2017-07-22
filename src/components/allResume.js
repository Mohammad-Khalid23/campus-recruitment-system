import React, { Component } from 'react';
import * as firebase from 'firebase'
import CreateCv from './createResume.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';




class ShowResume extends Component {

    constructor(props) {
        super(props)
        this.state = {
            resume: []
        }
    }

    componentWillMount() {
        const rootRef = firebase.database().ref('resume');
        rootRef.on('value', snap => {
            var obj = snap.val()

            var resume = [];
            for (let key in obj) {
                resume.push(obj[key])
            }
            console.log(obj, "snap value")
            console.log(resume, "after each loop value")
            this.setState({
                resume: snap.val()
            })
        })
        setTimeout(() => {
            console.log(console.log(this.state) // this shows blank array
            )
        },5000)
    }


    render() {
        return (
            <div className="row">
                <h1>Resume</h1>
                {
                    this.state.resume.map((data)=>{

                           return <div>
                                {data.name}
                            </div>

                    })
                }
            </div>

        )

    }
}
export default ShowResume;