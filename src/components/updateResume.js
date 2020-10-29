import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase'

class UpdateResume extends Component {

    constructor() {
        super()
        this.state = {
            resume: []
        }

    }

    componentWillMount() {
        const auth = firebase.auth();
        auth.onAuthStateChanged(() => {
            const userId = auth.currentUser.uid;

            if (userId) {

                const rootRef = firebase.database().ref();
                const speedRef = rootRef.child('resume/' + userId);
                speedRef.on('value', snap => {
                    var userObj = snap.val();
                    console.log(this.refs)
                    this.setState({ user: userObj });
                    if (userObj && this.refs.name) {
                        this.refs.name.value = userObj.name;
                        this.refs.number.value = userObj.number;
                        this.refs.skills.value = userObj.skills;
                        this.refs.qualification.value = userObj.qualification;
                        this.refs.experience.value = userObj.experience;
                    }
                })
            }
        })

    }
    updateResume() {


        const studentName = this.refs.name.value;
        const studentNumber = this.refs.number.value;
        const studentSkills = this.refs.skills.value;
        const studentQualification = this.refs.qualification.value;
        const studentExperience = this.refs.experience.value;
        if (studentName === "" || studentNumber === "" || studentSkills === "" || studentQualification === "" || studentExperience === "") {
            alert("please Fill the Form Complete")
        } else {
            var resumeObj = {
                name: studentName,
                number: studentNumber,
                skills: studentSkills,
                qualification: studentQualification,
                experience: studentExperience
            }
            const userId = firebase.auth().currentUser.uid;
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('resume/' + userId);
            speedRef.set(resumeObj);
            alert("Resume Updated")
            this.props.history.push('/student')
        }
    }

    render() {
        return (
            <div className="jobDiv">

                <div className="form1 ">
                    <h1>Edit Resume</h1>
                    <label htmlFor="name">Name
                <input className="form-control" type="text" ref="name" id="name" placeholder="Name.." />
                    </label>
                    <label htmlFor="number">Number
                <input type="text" className="form-control" ref="number" id="number" placeholder="Number.." />
                    </label>
                    <label htmlFor="skills">Skills
                <input type="text" className="form-control" ref="skills" id="skills" placeholder="Skills.." />
                    </label>
                    <label htmlFor="qualification">Qualification
                <input type="text" className="form-control" ref="qualification" id="qualification" placeholder="Qualification.." />
                    </label>
                    <label htmlFor="experience">Experience
                <input type="text" className="form-control" ref="experience" id="experience" placeholder="Experience.." />
                    </label> <br />
                    <button className="btn btn-primary" onClick={this.updateResume.bind(this)}>Update</button>

                </div>



            </div>
        )
    }

}

export default UpdateResume;
