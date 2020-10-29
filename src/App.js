import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import Header from './components/header.js'
import Signup from './components/signup.js'
import Login from './components/login.js'
import Students from './components/student.js'
import Company from './components/company.js'
import CreateResume from './components/createResume.js'
import PostJobs from './components/postJob.js'
import Admin from './components/admin.js'
import ShowResume from './components/allResume.js'
import ShowJobs from './components/allJobs.js'
import Profile from './components/profile.js'
import ViewStudents from './components/viewStudents.js'
import UpdateResume from './components/updateResume.js'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeUser: null,
      user: []
    }

  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          activeUser: true
        })
      } else {
        this.setState({
          activeUser: false
        })
        console.log("No login")
      }

    })
  }

  logout() {
    firebase.auth().signOut().then(function () {
      alert("Logout")
      this.props.history.push('/')
    }).catch(function (err) {
      console.log(err.message);
    })

  }



  render() {
    return (
      <div className="fluid-container" >

        <Header />

        <Router >
          <div>
            <div className="nav-div">
               {/* <button><Link to="/student">Student</Link></button>
              <button><Link to="/company">Company</Link></button>  */}
              {this.state.activeUser ?
                <button className="right" onClick={this.logout.bind(this)}><Link to="/">Logout</Link></button>
                : <button className="right"><Link to="/signup">Signup</Link></button>
              }
            </div>

            <div id="content">
              <Route path="/admin" component={Admin} />
              <Route path="/signup" component={Signup} />
              <Route exact path="/" component={Login} />
              {/*Student Routes*/}

              <Route path="/student" component={Students} />
              <Route path="/resume" component={CreateResume} />
              <Route path="/allResume" component={ShowResume} />
              <Route path="/updateResume" component={UpdateResume} />
              <Route path="/allJobs" component={ShowJobs} />
              {/*Company Routes*/}
              <Route path="/company" component={Company} />
              <Route path="/allStudents" component={ViewStudents} />
              <Route path="/profile" component={Profile} />
              <Route path="/postjob" component={PostJobs} />


            </div>
          </div>
        </Router>

      </div>

    );
  }
}

export default App;