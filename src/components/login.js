import React, { Component } from 'react';
import * as firebase from 'firebase'
// import App from './/App.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: []
        }
    }

    loginUser() {
        const email = this.refs.email.value;
        const pass = this.refs.password.value;
        if (email === "" || pass === "") {
            alert("please fill the form completly")
        } else {

            const auth = firebase.auth();
            auth.signInWithEmailAndPassword(email, pass).catch(function (err) {
                console.log(err.code)
                console.log(err.message)

            });

            //checking  login user
            auth.onAuthStateChanged((user) => {
                setTimeout(() => {
                    if (user) {
                        // alert("kuch bhi");
                        if (email === "admin@gmail.com" && pass === "admin12345") {
                            this.props.history.push('/admin')
                        }
                        else {
                            const userId = firebase.auth().currentUser.uid;
                            const userRef = firebase.database().ref().child('users/' + userId)
                            userRef.on('value', snap => {
                                var user = snap.val();
                                var userType = []
                                for (let key in user) {
                                    userType.push(user[key])
                                }
                                console.log(userType)
                                console.log(userType[0].type) // it give me type of user

                                if (userType[0].type === "student") {
                                    this.props.history.push('/student')

                                } else if (userType[0].type === "company") {
                                    this.props.history.push('/company')

                                }
                            })
                        }
                    }
                }, 300)
            })
        }
    }

    render() {
        return (
            <div>
                <h1 ref="heading">Welcome to Campus Recruiment System</h1> <br />
                <div className="form log_height">

                    <h1>Login Form</h1>
                    <label htmlFor="email">
                        Email  <input className="form-control" type="text" id="email" ref="email" />
                    </label>
                    <br />
                    <label htmlFor="pass">
                        Password<input className="form-control" type="password" id="pass" ref="password" />
                    </label> <br />
                    <button className="btn btn-primary" onClick={this.loginUser.bind(this)} ref="signupBtn">Login</button>
                </div>
            </div>
        );
    }
}

export default Login;