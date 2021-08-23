import React, { Component } from "react";
import AdminService from "../../services/AdminService";
class AddClassSchedule extends Component {
    constructor() {
        super();
        this.state = {
            lecturers: [],
            modules: [],
            academicPeriods: [],
            lecturer: "",
            module: "",
            academicPeriod: "",
            classsize: "",
            days: {
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false,
                Sunday: false
            },
        };
    }

    changeLecturerHandler = (event) => {
        this.setState({ lecturer: event.target.value });
    }

    changeModuleHandler = (event) => {
        this.setState({ module: event.target.value });
    }

    changeAcademicPeriodHandler = (event) => {
        this.setState({ academicPeriod: event.target.value });
    }

    changeClasssizeHandler = (event) => {
        this.setState({ classsize: event.target.value });
    }

    ChangeMondayHandler = (event) => {
        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Monday: event.target.checked
                }
            };
        });
    }

    ChangeTuesdayHandler = (event) => {
        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Tuesday: event.target.checked
                }
            };
        });
    }

    ChangeWednesdayHandler = (event) => {
        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Wednesday: event.target.checked
                }
            };
        });
    }

    ChangeThursdayHandler = (event) => {
        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Thursday: event.target.checked
                }
            };
        });
    }

    ChangeFridayHandler = (event) => {

        this.setState(function (prevState) {
            return {
                days: {
                    ...prevState.days,
                    Friday: event.target.checked
                }
            };
        });
    }

    saveSchedule = (e) => {
        e.preventDefault();

        let schedule = {
            lecturer: this.state.lecturer,
            module: this.state.module,
            academicPeriod: this.state.academicPeriod,
            classsize: this.state.classsize,
            days: this.state.days
        };

        AdminService.addSchedules(schedule).then(res=>{
            this.props.history.push('/admin/ListClassSchedule');
        });
    }

    cancel() {
        this.props.history.push("/admin/ListClassSchedule");
    }

    componentDidMount() {
        AdminService.getLecturers().then((res) => {
            this.setState({ lecturers: res.data })
        });

        AdminService.getModules().then((res) => {
            this.setState({ modules: res.data })
        });

        AdminService.getAcademicPeriods().then((res) => {
            this.setState({ academicPeriods: res.data })
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
                                        <select value={this.state.lecturer} className="custom-select" id="lastName"
                                            onChange={this.changeLecturerHandler}>
                                            <option selected="selected" disabled="disabled" value=''>select a lecturer</option>
                                            {this.state.lecturers.map(item => (
                                                <option key={item.id}
                                                    value={item.id}>
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
                                        <select value={this.state.module} className="custom-select" id="lastName"
                                            onChange={this.changeModuleHandler}>
                                            <option selected="selected" disabled="disabled" value=''>select a module</option>
                                            {this.state.modules.map((item) => (
                                                <option key={item.id}
                                                    value={item.id}>
                                                    {item.code + " " + item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                                <p></p>
                                <form>
                                    <div className="form-group">
                                        <label>Academic Period: </label>&nbsp;
                                        <select value={this.state.academicPeriod} className="custom-select" id="lastName"
                                            onChange={this.changeAcademicPeriodHandler}>
                                            <option selected="selected" disabled="disabled" value=''>select an academicPeriod</option>
                                            {this.state.academicPeriods.map((item) => (
                                                <option key={item.id}
                                                    value={item.id}>
                                                    {item.year + " " + item.semester}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
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
                                        onChange={this.ChangeMondayHandler}
                                    />{" "}
                                    Mon &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={this.state.days.Tuesday}
                                        onChange={this.ChangeTuesdayHandler}
                                    />{" "}
                                    Tue &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={this.state.days.Wednesday}
                                        onChange={this.ChangeWednesdayHandler}
                                    />{" "}
                                    Wed &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={this.state.days.Thursday}
                                        onChange={this.ChangeThursdayHandler}
                                    />{" "}
                                    Thu &nbsp;
                                    <input
                                        type="checkbox"
                                        checked={this.state.days.Friday}
                                        onChange={this.ChangeFridayHandler}
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