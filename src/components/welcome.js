import React, { Component } from 'react';
import  Login from './login.js'
import '../App.css';

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