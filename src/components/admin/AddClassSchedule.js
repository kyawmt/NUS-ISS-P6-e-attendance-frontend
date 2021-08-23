import React, { Component } from "react";
import AdminService from "../../services/AdminService";
import axiosInstance from "../../services/axiosInstance";
class AddClassSchedule extends Component {
    constructor() {
        super();
        this.state = {
            lecturers: [],
            modules: [],
            lecturer: "",
            module: "",
            year: "",
            semester: "",
            classsize: "",
            days: [{
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false
            }],
        };
    }

    changeLecturerHandler = (event) => {
        this.setState({ lecturer: event.target.value });
    }

    changeModuleHandler = (event) => {
        this.setState({ module: event.target.value });
    }

    changeYearHandler = (event) => {
        this.setState({ year: event.target.value });
    }

    changeSemesterHandler = (event) => {
        this.setState({ semester: event.target.value });
    }

    changeClasssizeHandler = (event) => {
        this.setState({ classsize: event.target.value });
    }

    ChangeMondayHandler(event) {
        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Monday: event.target.checked
                }
            };
        });
    }

    ChangeTuesdayHandler(event) {
        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Tuesday: event.target.checked
                }
            };
        });
    }

    ChangeWednesdayHandler(event) {
        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Wednesday: event.target.checked
                }
            };
        });
    }

    ChangeThursdayHandler(event) {
        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Thursday: event.target.checked
                }
            };
        });
    }

    ChangeFridayHandler(event) {

        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Friday: event.target.checked
                }
            };
        });
    }

    saveSchedule=(e)=>{
        e.preventDefault();

        let schedule={
            lecturer:this.state.lecturer,
            module:this.state.module, 
            year:this.state.year,
            semester:this.state.semester,
            classsize:this.state.classsize,
            days:this.state.days
        };
        AdminService.addSchedules( schedule).then(response => {
                console.log(response.data);
                this.setState({
                    message: "The schedule was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    cancel() {
        this.props.history.push("/admin/class-schedule");
    }

    componentDidMount() {
        AdminService.getLecturers().then((res) => {
            this.setState({ lecturers: res.data })
        });

        AdminService.getModules().then((res) => {
            this.setState({ modules: res.data })
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3" style={{ marginTop: "50px" }} >
                            <h3 className="text-center" style={{ marginTop: "10px" }}>
                                Add Schedule Form
                            </h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Lecturer Name: </label>
                                        <select className="custom-select" id="lastName">
                                            {this.state.lecturers.map(item => (
                                                <option key={item.id}
                                                    value={item.id}
                                                    onChange={this.changeLecturerHandler}>
                                                    {item.firstName + " " + item.lastName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                                <p></p>
                                <form>
                                    <div className="form-group">
                                        <label>Module Code: </label>&nbsp;
                                        <select className="custom-select" id="lastName">
                                            {this.state.modules.map((item) => (
                                                <option key={item.id}
                                                    value={item.id}
                                                    onChange={this.changeModuleHandler}>
                                                    {item.code}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="form-group" style={{ marginTop: "10px" }}>
                                <label>Academic Year: </label>
                                <input
                                    placeholder="Enter Academic Year"
                                    name="acadYear"
                                    className="form-control"
                                    value={this.state.year}
                                    onChange={this.changeYearHandler}
                                />
                            </div>
                            <div className="form-group" style={{ marginTop: "10px" }}>
                                <label>Semester: </label>
                                <input
                                    placeholder="Enter Semester"
                                    name="semester"
                                    className="form-control"
                                    value={this.state.semester}
                                    onChange={this.changeSemesterHandler}
                                />
                            </div>
                            <div className="form-group" style={{ marginTop: "10px" }}>
                                <label>Class Size: </label>
                                <input
                                    placeholder="Enter Class Size"
                                    name="classSize"
                                    className="form-control"
                                    value={this.state.classsize}
                                    onChange={this.changeClasssizeHandler}
                                />
                            </div>
                            <div className="form-group" style={{ marginTop: "10px" }}>
                                <label>Days: </label>
                                <form>
                                    <input type="checkbox"
                                        checked={this.state.days.Monday}
                                        onChange={this.handleChange}
                                    />{" "}
                                    Mon &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={this.state.days.Tuesday}
                                        onChange={this.handleChange}
                                    />{" "}
                                    Tue &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={this.state.days.Wednesday}
                                        onChange={this.handleChange}
                                    />{" "}
                                    Wed &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={this.state.days.Thursday}
                                        onChange={this.handleChange}
                                    />{" "}
                                    Thu &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={this.state.days.Friday}
                                        onChange={this.handleChange}
                                    />{" "}
                                    Fri
                                </form>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <button className="btn btn-success" onClick={this.saveSchedule}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={this.cancel.bind(this)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddClassSchedule;