
import React, { Component } from 'react';
import './login.css';


export default class SignupComponent extends Component {
    render() {
        return (
            <div className='container login-div'>
                <form className="text-center border border-light p-5" action="#!">

                    <p className="h4 mb-4">Sign up</p>
                    <input type="text" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="first name"/>
                    <input type="text" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="last name"/>
                    
                    <input type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail"/>

                    <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password"/>
                    <select name='gender' className='form-control mb-4'>
                        <option>Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    <input type="text" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="job role"/>
                    <input type="text" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="Department"/>
                    <input type="text" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="Address"/>
                    <div className="d-flex justify-content-around">
                        <div>
                        
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember"/>
                                <label className="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                            </div>
                        </div>
                        <div>
                           
                            <a href="">Forgot password?</a>
                        </div>
                    </div>

                    
                    <button className="btn btn-secondary btn-block my-4" type="submit">Sign in</button>


                   

</form>

            </div>
        )
    }
}
