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
import GetAdminToAddModule from './components/lecturer/GetAdminToAddModule';

function App() {

  const role=sessionStorage.getItem("role");

  return (
    <div className="page-container">
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
            <Route path="/admin/home" component={role=="admin"? AdminMainPageComponent:LoginComponent}></Route>
            <Route path="/lecturer/home" component={role=="lecturer"? LecturerMainPage:LoginComponent}></Route>
            <Route path="/login" component={LoginComponent}></Route>

            <Route path="/admin/lecturers" component={role=="admin"? ListLecturer:LoginComponent}></Route>
            <Route path="/admin/add-lecturer/:id" component={role=="admin"? AddOrUpdateLecturer:LoginComponent}></Route>
            <Route path="/admin/students" component={role=="admin"? ListStudent:LoginComponent}></Route>
            <Route path="/admin/add-student/:id" component={role=="admin"? AddOrUpdateStudent:LoginComponent}></Route>
            <Route path="/admin/add-student-photo/:id" component={role=="admin"? AddStudentPhoto:LoginComponent}></Route>

            <Route path="/admin/ListModule" component={role=="admin"? ListModule:LoginComponent}></Route>
            <Route path="/admin/add-Module/:id" component={role=="admin"? AddOrUpdateModule:LoginComponent}></Route>
            <Route path="/admin/module-attendance" component={role=="admin"? ListModuleAttendence:LoginComponent}></Route>
            <Route path="/admin/module-classes-attendance/:id" component={role=="admin"? ViewModuleAttendence:LoginComponent}></Route>
            <Route path="/admin/class-students-attendance/:id" component={role=="admin"? ViewModuleStudentAttendance:LoginComponent}></Route>

            <Route path="/admin/classes" component={role=="admin"? ListClass:LoginComponent}></Route>
            <Route path="/admin/class-view-students/:id" component={role=="admin"? ViewClassStudents:LoginComponent}></Route>
            <Route path="/admin/class-enroll-students/:id" component={role=="admin"? EnrollStudents:LoginComponent}></Route>

            <Route path="/lecturer/dashboard/:id" component={role=="lecturer"? ViewDashboard:LoginComponent} exact></Route>
            <Route path="/lecturer/predictedStudents/:id/:index" component={role=="lecturer"?PredictedStudents:LoginComponent}></Route>

            <Route path="/admin/ListClassSchedule" component={role=="admin"?ListClassSchedule:LoginComponent}></Route>
            <Route path="/admin/add-class-schedule/:id" component={role=="admin"?AddClassSchedule:LoginComponent} ></Route>
            <Route path="/admin/student-leave-application" component={role=="admin"?ListStudentsLeave:LoginComponent}></Route>

            <Route path="/lecturer/schedules" component={role=="lecturer"?ListTeachingSchedule:LoginComponent}></Route>
            <Route path="/lecturer/qrcode/:id/:option" component={role=="lecturer"?ViewClassQRCode:LoginComponent}></Route>
            <Route path="/lecturer/overview/0" component={role=="lecturer"?GetAdminToAddModule:LoginComponent}></Route>
            <Route path="/lecturer/overview/:id" component={role=="lecturer"?ListClassStudentAttendance:LoginComponent}></Route>
            

          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
