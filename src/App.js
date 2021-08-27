import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/fragments/FooterComponent';
import HeaderComponent from './components/fragments/HeaderComponent';
import LoginComponent from './components/fragments/LoginComponent';
import ListLecturer from './components/admin/ListLecturer';
import AddOrUpdateLecturer from './components/admin/AddOrUpdateLecturer';
import AddOrUpdateModule from './components/admin/AddOrUpdateModule';
import ListModule from './components/admin/ListModule';
import AdminMainPageComponent from './components/admin/AdminMainPageComponent';
import LecturerMainPage from './components/lecturer/LecturerMainPage';
import HomeComponent from './components/fragments/HomeComponent';
import ListStudent from './components/admin/ListStudent';
import AddOrUpdateStudent from './components/admin/AddOrUpdateStudent';
import AddStudentPhoto from './components/admin/AddStudentPhoto';
import ListClassSchedule from './components/admin/ListClassSchedule';
import AddClassSchedule from "./components/admin/AddClassSchedule";
import ListClass from './components/admin/ListClass';
import ListStudentsLeave from './components/admin/ListStudentsLeave';
import ListModuleAttendence from './components/admin/ListModuleAttendance';
import ViewModuleStudentAttendance from './components/admin/ViewModuleStudentAttendance';
import ViewModuleAttendence from './components/admin/ViewModuleAttendance';
import ViewDashboard from './components/lecturer/ViewDashboard';
import PredictedStudents from './components/lecturer/PredictedStudents';
import ListTeachingSchedule from './components/lecturer/ListTeachingSchedule';
import ViewClassQRCode from './components/lecturer/ViewClassQRCode';
import ListClassStudentAttendance from './components/lecturer/ListClassStudentAttendence';
import ViewClassStudents from './components/admin/ViewClassStudents';
import EnrollStudents from './components/admin/EnrollStudents';

function App() {

  return (
    <div className="page-container">
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
            <Route path="/admin/home" component={AdminMainPageComponent}></Route>
            <Route path="/lecturer/home" component={LecturerMainPage}></Route>
            <Route path="/login" component={LoginComponent}></Route>

            <Route path="/admin/lecturers" component={ListLecturer}></Route>
            <Route path="/admin/add-lecturer/:id" component={AddOrUpdateLecturer}></Route>
            <Route path="/admin/students" component={ListStudent}></Route>
            <Route path="/admin/add-student/:id" component={AddOrUpdateStudent}></Route>
            <Route path="/admin/add-student-photo/:id" component={AddStudentPhoto}></Route>

            <Route path="/admin/ListModule" component={ListModule}></Route>
            <Route path="/admin/add-Module/:id" component={AddOrUpdateModule}></Route>
            <Route path="/admin/module-attendance" component={ListModuleAttendence}></Route>
            <Route path="/admin/module-classes-attendance/:id" component={ViewModuleAttendence}></Route>
            <Route path="/admin/class-students-attendance/:id" component={ViewModuleStudentAttendance}></Route>

            <Route path="/admin/classes" component={ListClass}></Route>
            <Route path="/admin/class-view-students/:id" component={ViewClassStudents}></Route>
            <Route path="/admin/class-enroll-students/:id" component={EnrollStudents}></Route>

            <Route path="/lecturer/dashboard/:id" component={ViewDashboard} exact></Route>
            <Route path="/lecturer/predictedStudents/:id/:index" component={PredictedStudents}></Route>

            <Route path="/admin/ListClassSchedule" component={ListClassSchedule}></Route>
            <Route path="/admin/add-class-schedule/:id" component={AddClassSchedule} ></Route>
            <Route path="/admin/student-leave-application" component={ListStudentsLeave}></Route>

            <Route path="/lecturer/schedules" component={ListTeachingSchedule}></Route>
            <Route path="/lecturer/qrcode/:id/:option" component={ViewClassQRCode}></Route>
            <Route path="/lecturer/overview/:id" component={ListClassStudentAttendance}></Route>

          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
