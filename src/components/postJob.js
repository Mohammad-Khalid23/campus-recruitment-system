import React, { Component } from 'react';
// import '../App.css';
import * as firebase from 'firebase'
import Header from './header.js'

class PostJobs extends Component {
    constructor() {
        super()
        this.state = {
            jobs: []
        }
    }


    job() {
        const jobTitle = this.refs.title.value;
        const jobType = this.refs.type.value;
        const salary = this.refs.salary.value;
        const jobSkills = this.refs.skills.value;
        const jobQualification = this.refs.qualification.value;
        const jobExperience = this.refs.experience.value;
        const userId = firebase.auth().currentUser.uid;

        if (jobTitle === "" || jobType === "" || jobSkills === "" || jobQualification === "" || jobExperience === "") {
            alert("Please Fill the Form Completly")
        }

        else {
            var job = {
                name: jobTitle,
                type: jobType,
                salary: salary,
                skills: jobSkills,
                qualification: jobQualification,
                experience: jobExperience,
                uid : firebase.auth().currentUser.uid
            }
 
            const rootRef = firebase.database().ref('jobs').push(job);

            this.refs.title.value = ""
            this.refs.type.value = ""
            this.refs.salary.value = ""
            this.refs.skills.value = ""
            this.refs.qualification.value = ""
            this.refs.experience.value = ""
            this.props.history.push('/allJobs')
        }
    }
    render() {
        return (
            <div className="jobDiv">
                <div className="form1 ">
                    <h1>Post Job</h1>
                    <label htmlFor="title">Job Title
                <input className="form-control" type="text" ref="title" id="title" placeholder="Job Title.." />
                    </label>
                    <label htmlFor="type">Job Type
                <input type="text" className="form-control" ref="type" id="type" placeholder="Job Type.." />
                    </label>
                    <label htmlFor="salary">Salary
                <input type="text" className="form-control" ref="salary" id="salary" placeholder="Salary.." />
                    </label>
                    <label htmlFor="skills">Required Skills
                <input type="text" className="form-control" ref="skills" id="skills" placeholder="Required Skills.. " />
                    </label>
                    <label htmlFor="qualification">Qualification
                <input type="text" className="form-control" ref="qualification" id="qualification" placeholder="Qualification.." />
                    </label>
                    <label htmlFor="experience">Required Experience
                <input type="text" className="form-control" ref="experience" id="experience" placeholder="Required Experience.." />
                    </label> <br />
                    <button className="btn btn-primary" onClick={this.job.bind(this)}>Post..</button>

                </div>


            </div>
        )
    }
}
export default PostJobs;