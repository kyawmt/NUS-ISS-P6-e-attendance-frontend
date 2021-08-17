import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import FooterComponent from './components/fragments/FooterComponent';
import HeaderComponent from './components/fragments/HeaderComponent';
import LoginComponent from './components/fragments/LoginComponent';
import ListLecturer from './components/admin/ListLecturer';
import AddOrUpdateLecturerComponent from './components/admin/AddOrUpdateLecturer';
import ListModule from './components/admin/ListModule';
import addOrUpdateModule from './components/admin/AddOrUpdateModule'
import AdminMainPageComponent from './components/admin/AdminMainPageComponent';
import LecturerMainPage from './components/lecturer/LecturerMainPage';
import HomeComponent from './components/fragments/HomeComponent';


function App() {
  return (
    <div>
      <Router>
          <HeaderComponent/>
          <div className="container">
            <Switch> 
              <Route path="/" exact component={HomeComponent}></Route>
              <Route path="/lecturers" component={ListLecturer}></Route>
              <Route path="/lecturer" component={LecturerMainPage}></Route>
              <Route path="/add-lecturer/:id" component={AddOrUpdateLecturerComponent}></Route>
              <Route path="/admin" component={AdminMainPageComponent}></Route>
              <Route path="/login" component={LoginComponent}></Route>
              <Route path="/module" component={ListModule}></Route>
              <Route path="/add-Module/:id" component={addOrUpdateModule}></Route>
              <ListLecturer/>
            </Switch>
          </div>
          <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
