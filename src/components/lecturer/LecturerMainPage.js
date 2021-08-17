import React, { Component } from 'react';

import TeachingSchedule from '../media/8_lecturer_TeachingSchedule.png';
import Attendance from '../media/9_lecturer_Attendance.png';
import Dashboard from '../media/10_lecturer_Dashboard.png';

import ListTeachingSchedule from './ListTeachingSchedule';
import ListClassStudentAttendance from './ListClassStudentAttendence';
import ViewDashboard from './ViewDashboard';

class LecturerMainPage extends Component {
    render() {
        return (
            <div>
                <div className="container">
            <div className="row align-items-center mt-4">
                <div className="col col-sm-3 d-flex justify-content-center">
                <div className="card white darken-1">
                <a href={ListTeachingSchedule} ><img src={TeachingSchedule} alt="TeachingSchedule"  height="200" width="200"/></a>
                </div>
                </div>

                <div className="col col-sm-3 d-flex justify-content-center">
                <div className="card white darken-1">
                <a href={ListClassStudentAttendance} ><img src={Attendance} alt="Modules"  height="200" width="200"/></a>
                </div>
                </div>

                <div className="col col-sm-3 d-flex justify-content-center">
                <div className="card white darken-1">
                <a href={ViewDashboard} ><img src={Dashboard} alt="ClassSchedule"  height="200" width="200"/></a>
                </div>
                </div>

            </div>
          </div>
          
            </div>
        );
    }
}

export default LecturerMainPage;