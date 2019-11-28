import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Navbar from './components/navbar.component';
import LoginComponent from './components/login/login.component'
import SignupComponent from './components/login/signup.component'

function App() {
  return (
    <Router>
    <div className='container'>
      <Navbar />
      <Route path='/login' component={ LoginComponent } />
      <Route path='/signup' component={ SignupComponent } />
    </div>
    </Router>
  );
}

export default App;
