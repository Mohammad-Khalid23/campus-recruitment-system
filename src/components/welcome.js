import React, { Component } from 'react';
import * as firebase from 'firebase'
import '../App.css';
import  Login from './login.js'
import Students from './student.js'
class Welcome extends Component {



    render() {

        return (
            <div className="row">
                <h1 ref="heading">Welcome to Campus Recruiment System</h1>
            <Login />
            </div>
        )
    }
}

export default Welcome; 