import React, { Component } from 'react';
import axios from "axios";
import AdminService from '../../services/AdminService';

class AddOrUpdateStudent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,

            firstName: "",
            lastName: "",
            userName: "",
            firstNameError: "",
            lastNameError: "",
            userNameError: "",
            isUserNameExist: false
        }

        this.changeFirstNameHandlers = this.changeFirstNameHandlers.bind(this);
        this.changeLastNameHandlers = this.changeLastNameHandlers.bind(this);
        this.changeUserNameHandlers = this.changeUserNameHandlers.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
        this.cancel = this.cancel.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }

    componentDidMount() {

        if (this.state.id == -1) {
            return;
        }
        else {
            AdminService.getStudentById(this.state.id).then(
                response => {
                    let student = response.data;
                    this.setState({
                        firstName: student.firstName,
                        lastName: student.lastName,
                        userName: student.userName,
                    })
                }
            );
        }
    }

    changeFirstNameHandlers = (event) => {
        this.setState({ firstName: event.target.value });
    }
    changeLastNameHandlers = (event) => {
        this.setState({ lastName: event.target.value });
    }
    changeUserNameHandlers = (event) => {
        this.setState({ userName: event.target.value });
        AdminService.isStudentExist(this.state.id, event.target.value).then(
            res => this.setState({ isUserNameExist: res.data })
        );
    }

    formValidation() {
        let { firstName, lastName, userName, isUserNameExist } = this.state;
        let isValid = true;

        if (firstName.trim().length == 0) {
            isValid = false;
            this.setState({ firstNameError: "Please fill in the first name" });
        } else {
            this.setState({ firstNameError: "" });
        }

        if (lastName.trim().length == 0) {
            isValid = false;
            this.setState({ lastNameError: "Please fill in the last name" });
        } else {
            this.setState({ lastNameError: "" });
        }

        if (userName.trim().length == 0) {
            isValid = false;
            this.setState({ userNameError: "Please fill in the user name" });
        }
        else if (!userName.includes("@")) {
            isValid = false;
            this.setState({ userNameError: "Please use email as user name" });
        }
        else if (isUserNameExist) {
            isValid = false;
            this.setState({ userNameError: "User name exist in system" });
        }
        else {
            this.setState({ userNameError: "" });
        }

        return isValid;
    }

    saveStudent(event) {
        event.preventDefault();

        const isValid = this.formValidation();

        if (isValid) {

            let student = { firstName: this.state.firstName, lastName: this.state.lastName, userName: this.state.userName };

            console.log('student=> ' + JSON.stringify(student));

            if (this.state.id == -1) {
                AdminService.addStudent(student).then(
                    reponse => {
                        this.props.history.push('/admin/students')
                    }
                )
            }
            else {
                AdminService.updateStudent(student, this.state.id).then(
                    reponse => {
                        this.props.history.push('/admin/students')
                    }
                )
            }
        }
    }

    cancel() {
        this.props.history.push('/admin/students')
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ marginTop: "50px" }}>
                            <h3 className="text-center">{this.state.id == -1 ? "Add Student Form" : "Edit Student Form"}</h3>
                            <div className="card-body">
                                <form onSubmit={this.saveStudent}>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input className="form-control" type="text" name="firstName"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandlers}
                                            style={{ border: this.state.firstNameError !== "" ? '0.5px solid red' : '' }} />
                                    </div>
                                    <div style={{ fontSize: 10, color: "red" }}>{this.state.firstNameError}</div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input className="form-control" type="text" name="lastName"
                                            value={this.state.lastName} onChange={this.changeLastNameHandlers}
                                            style={{ border: this.state.lastNameError !== "" ? '0.5px solid red' : '' }} />
                                    </div>
                                    <div style={{ fontSize: 10, color: "red" }}>{this.state.lastNameError}</div>
                                    <div className="form-group">
                                        <label>User Name:</label>
                                        <input className="form-control" type="text" name="userName"
                                            value={this.state.userName} onChange={this.changeUserNameHandlers}
                                            style={{ border: this.state.userNameError !== "" ? '0.5px solid red' : '' }} />
                                    </div>
                                    <div style={{ fontSize: 10, color: "red" }}>{this.state.userNameError}</div>

                                    <div style={{ marginTop: '5px' }}>
                                        <button className="btn btn-success">{this.state.id == -1 ? "Save" : "Update"}</button>
                                        <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddOrUpdateStudent;