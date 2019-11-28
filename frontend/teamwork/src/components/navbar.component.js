import React, { Component } from 'react';
import './navbar.css'
import { Link } from "react-router-dom";
class NavBar extends Component {
    state = {  }

    render() { 
        return (  
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">TeamWork</Link>
                <div className="collapse navbar-collapse left">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-Link"><button className='btn btn-default btn-secondary'>New article</button></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-Link" ><button className='btn btn-default btn-secondary'>My Articles</button></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/signup" className="nav-Link" ><button className='btn btn-default btn-secondary' >Sign Up</button></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login" className="nav-Link" ><button className='btn btn-default btn-secondary' >Log In</button></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users" className="nav-Link" ><button className='btn btn-default btn-secondary' >Log Out</button></Link>
                        </li>
                    </ul>
                </div>
                
            </nav>
        );
    }
}
 
export default NavBar;