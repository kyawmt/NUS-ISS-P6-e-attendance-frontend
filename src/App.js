import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import FooterComponent from './components/fragments/FooterComponent';
import HeaderComponent from './components/fragments/HeaderComponent';
import LoginComponent from './components/fragments/LoginComponent';
import ListLecturer from './components/admin/ListLecturer';
import AddOrUpdateLecturerComponent from './components/admin/AddOrUpdateLecturer';


function App() {
  return (
    <div>
      <Router>
          <HeaderComponent/>
          <div className="container">
            <Switch> 
              <Route path="/" exact component={ListLecturer}></Route>
              <Route path="/lecturers" component={ListLecturer}></Route>
              // update: step 1
              <Route path="/add-lecturer/:id" component={AddOrUpdateLecturerComponent}></Route>
              
              <Route path="/login" component={LoginComponent}></Route>
              <ListLecturer/>
            </Switch>
          </div>
          <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
