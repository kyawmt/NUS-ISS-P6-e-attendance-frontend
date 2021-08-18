import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import AdminService from "../../services/AdminService";

class ListClassSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
    };
    this.addSchedule = this.addSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
  }

  componentDidMount() {
    AdminService.getSchedules().then((res) => {
      this.setState({ schedules: res.data });
    });
  }

  addSchedule() {
    this.props.history.push("/admin/add-class-schedule/-1");
  }

  deleteSchedule(id) {
    AdminService.deleteSchedule(id).then((res) => {
      this.setState({
        schedules: this.state.schedules.filter(
          (schedule) => schedule.id !== id
        ),
      });
    });
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
            {this.state.schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td> {schedule._class.module.code} </td>
                <td> {schedule._class.module.name} </td>
                <td> {schedule._class.academicPeriod.year} </td>
                <td> {schedule._class.academicPeriod.semester} </td>
                <td>
                  {schedule._class.lecturer.firstName +
                    " " +
                    schedule._class.lecturer.lastName}
                </td>
                <td>
                  <form>
                    <p>
                      <input
                        type="checkbox"
                        // checked={this.props.}
                        // onChange={this.handleChange}
                      />{" "}
                      Mon &nbsp;
                      <input
                        type="checkbox"
                        // checked={this.props.}
                        // onChange={this.handleChange}
                      />{" "}
                      Tue &nbsp;
                      <input
                        type="checkbox"
                        // checked={this.props.}
                        // onChange={this.handleChange}
                      />{" "}
                      Wed &nbsp;
                      <input
                        type="checkbox"
                        // checked={this.props.}
                        // onChange={this.handleChange}
                      />{" "}
                      Thu &nbsp;
                      <input
                        type="checkbox"
                        // checked={this.props.}
                        // onChange={this.handleChange}
                      />{" "}
                      Fri
                    </p>
                  </form>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => this.deleteSchedule(schedule.id)}
                  >
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
