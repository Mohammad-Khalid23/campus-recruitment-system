import React, { Component } from 'react';
import * as firebase from 'firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Signup extends Component {

    constructor() {
        super()

        this.state = {
            user: null
        }
    }
    //setting radio button value in state this condition is just for checking
    setUser(event) {
        if (this.state.user === null) {
            this.setState({
                user: event.target.value
            })
        } else {
            this.setState({
                user: event.target.value

            })
        }
    }

    signupUser() {
        const name = this.refs.name.value;
        const number = this.refs.number.value;
        const email = this.refs.email.value;
        const pass = this.refs.password.value;
        //validating email nad password
        if (email === "" || pass === "" || name === "" || number === "") {
            alert("please fill the form completly")
        } else {
            const auth = firebase.auth();
            auth.createUserWithEmailAndPassword(email, pass).catch(function (err) {
                console.log(err.code)
                console.log(err.message);
                alert(err.message);
            });

            auth.onAuthStateChanged((user) => {
                if (user) {
                    const userId = auth.currentUser.uid

                    var userObj = {
                        name: name,
                        number: number,
                        email: email,
                        type: this.state.user
                    }
                    const rootRef = firebase.database().ref()
                    rootRef.child('users/' + userId).push(userObj)
                    console.log(this.state.user, "svaed in data base")
                    this.props.history.push('/login')
                }
            })
        }
    }


    loginUser() {

    }
    render() {



        return (
            <div>
                <h1 ref="heading">Welcome to Campus Recruiment System</h1> <br />

                <div className="form sign_height">

                    <h1>Signup Form</h1>
                    <label htmlFor="name">
                        Name  <input className="form-control" type="text" id="name" ref="name" />
                    </label>
                    <label htmlFor="email">
                        Email   <input className="form-control" type="text" id="email" ref="email" />
                    </label>
                    <br />
                    <label htmlFor="pass">
                        Password <input className="form-control" type="password" id="pass" ref="password" />
                    </label>
                    <label htmlFor="number">
                        Number   <input className="form-control" type="text" id="number" ref="number" />
                    </label>
                    <br />

                    {/*Radio button*/}
                    <div className="radioButton" onChange={this.setUser.bind(this)}>
                        <label htmlFor="student">Student &nbsp;
            <input type="radio" value="student" name="user" id="student" />
                        </label> &nbsp;
                <label htmlFor="company">Company &nbsp;
            <input type="radio" value="company" name="user" id="company" />
                        </label></div>     <br />

                    <button className="btn btn-primary" onClick={this.signupUser.bind(this)} ref="signupBtn">signup</button> <br />
                    <p><br /><Link to="/">Already Login..??</Link></p>
                </div>
            </div>


        );

    }
}

export default Signup;