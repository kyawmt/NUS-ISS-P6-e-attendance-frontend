import React, { Component } from 'react';
import {Link } from "react-router-dom";
import Accounts from '../media/2_admin_Accounts.png';
import Modules from '../media/3_admin_Modules.png';
import ClassSchedule from '../media/4_admin_ClassSchedule.png';
import Enrolments from '../media/5_admin_Enrolments.png';
import Attendance from '../media/6_admin_Attendance.png';
import StudentLeaveApplication from '../media/7_admin_StudentLeaveApplication.png';

import ListStudent from './ListStudent';
import ListModule from './ListModule';
import ListClassSchedule from './ListClassSchedule';
import ListClass from './ListClass';
import ListModuleAttendance from './ListModuleAttendence';
import ListStudentsLeave from './ListStudentsLeave';

class AdminMainPageComponent extends Component {
    render() {
        return (
            <div>
               
          <div className="container">
            <div className="row align-items-center mt-4">
                <div className="col col-sm-3 d-flex justify-content-center">
                <div className="card white darken-1">
                <a href={ListStudent} ><img src={Accounts} alt="Accounts"  height="200" width="200"/></a>
                </div>
                </div>

                <div className="col col-sm-3 d-flex justify-content-center">
                <div className="card white darken-1">
                <a href={ListModule} ><img src={Modules} alt="Modules"  height="200" width="200"/></a>
                </div>
                </div>

                <div className="col col-sm-3 d-flex justify-content-center">
                <div className="card white darken-1">
                <a href={ListClassSchedule} ><img src={ClassSchedule} alt="ClassSchedule"  height="200" width="200"/></a>
                </div>
                </div>

                <div className="col col-sm-3 d-flex justify-content-center">
                <div className="card white darken-1">
                <a href={ListClass} ><img src={Enrolments} alt="Enrolments"  height="200" width="200"/></a>
                </div>
                </div>
                
                <div className="col col-sm-3 d-flex justify-content-center">
                <div className="card white darken-1">
                <a href={ListModuleAttendance} ><img src={Attendance} alt="Attendance"  height="200" width="200"/></a>
                </div>
                </div>

                <div className="col col-sm-3 d-flex justify-content-center">
                <div className="card white darken-1">
                <a href={ListStudentsLeave} ><img src={StudentLeaveApplication} alt="StudentLeaveApplication"  height="200" width="200"/></a>
                </div>
                </div>
            </div>
          </div>
          
            </div>
        );
    }
}

export default AdminMainPageComponent;
