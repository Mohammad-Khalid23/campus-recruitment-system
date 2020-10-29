import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase'

class CreateResume extends Component {

    constructor() {
        super()
        this.state = {
            resume: []
        }

    }

    createResume() {
        const studentName = this.refs.name.value;
        const studentNumber = this.refs.number.value;
        const studentSkills = this.refs.skills.value;
        const studentQualification = this.refs.qualification.value;
        const studentExperience = this.refs.experience.value;
        const resume = true;
        if (studentName === "" || studentNumber === "" || studentSkills === "" || studentQualification === "" || studentExperience === "") {
            alert("please Fill the Form Complete")
        } else {
            var resumeObj = {
                name: studentName,
                number: studentNumber,
                skills: studentSkills,
                qualification: studentQualification,
                experience: studentExperience,
                hasResume: resume
            }

            const rootRef = firebase.database().ref();
            rootRef.child('resume/' + firebase.auth().currentUser.uid).set(resumeObj);

            this.refs.name.value = "";
            this.refs.number.value = "";
            this.refs.skills.value = "";
            this.refs.qualification.value = "";
            this.refs.experience.value = "";
        }
        this.props.history.push('/student')
    }

    render() {
        return (
            <div className="jobDiv">
                <div className="form1 ">
                    <h1>Create Resume</h1>
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
                    <button className="btn" onClick={this.createResume.bind(this)}>Create</button>

                </div>



            </div>
        )
    }

}

export default CreateResume;

