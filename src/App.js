import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FooterComponent from "./components/fragments/FooterComponent";
import HeaderComponent from "./components/fragments/HeaderComponent";
import LoginComponent from "./components/fragments/LoginComponent";
import ListLecturer from "./components/admin/ListLecturer";
import AddOrUpdateLecturer from "./components/admin/AddOrUpdateLecturer";
import AddOrUpdateModule from "./components/admin/AddOrUpdateModule";
import ListModule from "./components/admin/ListModule";
import AdminMainPageComponent from "./components/admin/AdminMainPageComponent";
import LecturerMainPage from "./components/lecturer/LecturerMainPage";
import HomeComponent from "./components/fragments/HomeComponent";
import ListStudent from "./components/admin/ListStudent";
import ListClassSchedule from "./components/admin/ListClassSchedule";
import ListClass from "./components/admin/ListClass";
import ListStudentsLeave from "./components/admin/ListStudentsLeave";
import ListModuleAttendence from "./components/admin/ListModuleAttendance";
import ViewModuleStudentAttendance from "./components/admin/ViewModuleStudentAttendance";
import ViewModuleAttendence from "./components/admin/ViewModuleAttendance";
import addOrUpdateModule from "./components/admin/AddOrUpdateModule";
import ViewDashboard from "./components/lecturer/ViewDashboard";
import ListClassStudentAttendence from "./components/lecturer/ListClassStudentAttendence";
import ListTeachingSchedule from "./components/lecturer/ListTeachingSchedule";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
            <Route
              path="/admin/home"
              component={AdminMainPageComponent}
            ></Route>
            <Route path="/lecturer/home" component={LecturerMainPage}></Route>
            <Route path="/login" component={LoginComponent}></Route>

            <Route path="/admin/lecturers" component={ListLecturer}></Route>
            <Route
              path="/admin/add-lecturer/:id"
              component={AddOrUpdateLecturer}
            ></Route>
            <Route path="/admin/ListStudent" component={ListStudent}></Route>

            <Route path="/admin/module" component={ListModule}></Route>
            <Route
              path="/admin/add-Module/:id"
              component={AddOrUpdateModule}
            ></Route>
            <Route
              path="/admin/module-attendance"
              component={ListModuleAttendence}
            ></Route>
            <Route
              path="/admin/module-classes-attendance/:id"
              component={ViewModuleAttendence}
            ></Route>
            <Route
              path="/admin/class-stuednts-attendance/:id"
              component={ViewModuleStudentAttendance}
            ></Route>

            <Route
              path="/lecturer/class-student-attendance"
              component={ListClassStudentAttendence}
            ></Route>
            <Route
              path="/lecturer/teaching-schedule"
              component={ListTeachingSchedule}
            ></Route>
            <Route path="/lecturer/dashboard" component={ViewDashboard}></Route>

            {/* these routes may need change when do the component coding*/}
            <Route
              path="/admin/class-schedule"
              component={ListClassSchedule}
            ></Route>
            <Route path="/admin/Class" component={ListClass}></Route>
            <Route
              path="/admin/student-leave-application"
              component={ListStudentsLeave}
            ></Route>

            <Route path="/module" component={ListModule}></Route>
            <Route path="/add-Module/:id" component={addOrUpdateModule}></Route>
            {/* <Route path="/lecturerDashboard" component={ViewDashboard}></Route> */}
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
