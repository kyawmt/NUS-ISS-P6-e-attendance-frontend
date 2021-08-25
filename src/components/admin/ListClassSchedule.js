import React, { Component } from "react";
import AdminService from "../../services/AdminService";

class ListClassSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
        };
        this.addSchedule = this.addSchedule.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
    }

    componentDidMount() {
        AdminService.getClasses().then((res) => {
            this.setState({ classes: res.data });
        });
    }

    addSchedule() {
        this.props.history.push("/admin/add-class-schedule/-1");
    }

    deleteClass(id) {
        AdminService.deleteClass(id).then(res => {
            this.setState({
                classes: this.state.classes.filter(_class => _class.id !== id)
            })
        }
        );
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Class Schedules</h1>
                <div>
                    <button className="btn btn-primary" onClick={this.addSchedule}>
                        Create Class Schedule
                    </button>
                </div>
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th> Class id</th>
                            <th> Module Code </th>
                            <th> Module Name </th>
                            <th> Academic Year </th>
                            <th> Semester </th>
                            <th> Lecturer</th>
                            <th> Days </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.classes.map((_class) => (
                            <tr key={_class.id}>
                                <td> {_class.code} </td>
                                <td> {_class.moduleCode} </td>
                                <td> {_class.moduleName} </td>
                                <td> {_class.year} </td>
                                <td> {_class.semester} </td>
                                <td>
                                    {_class.lecturerName}
                                </td>
                                <td>
                                    <form>
                                        <p>
                                            <input
                                                type="checkbox"
                                                checked={_class.Monday}
                                            />{" "}
                                            Mon &nbsp;
                                            <input
                                                type="checkbox"
                                                checked={_class.Tuesday}

                                            />{" "}
                                            Tue &nbsp;
                                            <input
                                                type="checkbox"
                                                checked={_class.Wednesday}

                                            />{" "}
                                            Wed &nbsp;
                                            <input
                                                type="checkbox"
                                                checked={_class.Thursday}

                                            />{" "}
                                            Thu &nbsp;
                                            <input
                                                type="checkbox"
                                                checked={_class.Friday}

                                            />{" "}
                                            Fri
                                        </p>
                                    </form>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => this.deleteClass(_class.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListClassSchedule;