import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase'
import Header from './header.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDom from 'react-dom';

class Profile extends Component {

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
            if (userId) {
                const rootRef = firebase.database().ref().child('users/' + userId);
                rootRef.on('value', snap => {
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
            <div className="row">

                <h1 className='profileHead' >User Profile</h1>
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

        )

    }
}
export default Profile;