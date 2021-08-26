import React, { Component } from "react";
import Accounts from "../media/2_admin_Accounts.png";
import Modules from "../media/3_admin_Modules.png";
import ClassSchedule from "../media/4_admin_ClassSchedule.png";
import Enrolments from "../media/5_admin_Enrolments.png";
import Attendance from "../media/6_admin_Attendance.png";
import StudentLeaveApplication from "../media/7_admin_StudentLeaveApplication.png";

class AdminMainPageComponent extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row align-items-center mt-4 d-inline-flex justify-content-center row-cols-3">
            <div className="col col-lg-3 d-inline-flex justify-content-center m-1 customMinWidth">
              <div className="cardCustom white darken-1">
                <a href={"./students"} className="v-align">
                  <img
                    src={Accounts}
                    alt="Accounts"
                    className="img-fluid"
                    
                  />
                </a>
              </div>
            </div>

            <div className="col col-lg-3 d-inline-flex justify-content-center m-1 customMinWidth">
              <div className="cardCustom white darken-1">
                <a href={"./ListModule"} className="v-align">
                  <img
                    src={Modules}
                    alt="Modules"
                    className="img-fluid"
                    
                  />
                </a>
              </div>
            </div>

            <div className="col col-lg-3 d-inline-flex justify-content-center m-1 customMinWidth">
              <div className="cardCustom white darken-1">
                <a href={"./ListClassSchedule"} className="v-align">
                  <img
                    src={ClassSchedule}
                    alt="ClassSchedule"
                    className="img-fluid"
                    
                  />
                </a>
              </div>
            </div>

            <div className="col col-lg-3 d-inline-flex justify-content-center m-1 customMinWidth">
              <div className="cardCustom white darken-1">
                <a href={"./classes"} className="v-align">
                  <img
                    src={Enrolments}
                    alt="Enrolments"
                    className="img-fluid"
                    
                  />
                </a>
              </div>
            </div>

            <div className="col col-lg-3 d-inline-flex justify-content-center m-1 customMinWidth">
              <div className="cardCustom white darken-1">
                <a href={"./module-attendance"} className="v-align">
                  <img
                    src={Attendance}
                    alt="Attendance"
                    className="img-fluid"
                    
                  />
                </a>
              </div>
            </div>

            <div className="col col-lg-3 d-inline-flex justify-content-center m-1 customMinWidth">
              <div className="cardCustom white darken-1">
                <a href={"./StudentLeaveApplication"} className="v-align">
                  <img
                    src={StudentLeaveApplication}
                    alt="StudentLeaveApplication"
                    className="img-fluid"
                    
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminMainPageComponent;
