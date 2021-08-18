import React, { Component } from "react";
import AdminService from "../../services/AdminService";

class AddClassSchedule extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      modules: [],
    };
  }

  cancel() {
    this.props.history.push("/admin/class-schedule");
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/admin/lecturers", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((results) => results.json())
      .then((data) => this.setState({ data: data }));

    fetch("http://localhost:8080/api/admin/modules", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((results) => results.json())
      .then((modules) => this.setState({ modules: modules }));
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div
              className="card col-md-6 offset-md-3"
              style={{ marginTop: "50px" }}
            >
              <h3 className="text-center" style={{ marginTop: "10px" }}>
                Add Schedule Form
              </h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Lecturer Name: </label>
                    &nbsp;
                    <select className="custom-select" id="lastName">
                      {this.state.data.map((item) => (
                        <option key={item.firstName + " " + item.lastName}>
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
                        <option key={item.code}>{item.code}</option>
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
                  // value={this.state.lastName}
                  // onChange={this.changeLastNameHandlers}
                />
              </div>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <label>Semester: </label>
                <input
                  placeholder="Enter Semester"
                  name="semester"
                  className="form-control"
                  // value={this.state.lastName}
                  // onChange={this.changeLastNameHandlers}
                />
              </div>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <label>Class Size: </label>
                <input
                  placeholder="Enter Class Size"
                  name="classSize"
                  className="form-control"
                  // value={this.state.lastName}
                  // onChange={this.changeLastNameHandlers}
                />
              </div>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <label>Days: </label>
                <form>
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
