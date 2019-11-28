
import React, { Component } from 'react';
import axios from 'axios';
import AlertsComponent from '../alerts/alerts.component';
import './login.css';


export default class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: []
        }
    }
   onChangeEmail = (e) =>{
       this.setState({
           email: e.target.value
       });
   }
   onChangePassword = (e) =>{
    this.setState({
        password: e.target.value
    });
}
onSubmit = (e) =>{
    e.preventDefault();
    const credentials = {
        email: this.state.email,
        password: this.state.password
    }
    axios.post('http://localhost:4000/api/v1/user/login', credentials).then(res =>{
        console.log(res.data);
        console.log(credentials)
    }).catch(err=>{
        console.log(err)
    });
}

    render() {
        return (
            <div className='container login-div'>
                
                <AlertsComponent errors={ this.state.errors } />
                <form className="text-center border border-light p-5" onSubmit={this.onSubmit}>

                    <p className="h4 mb-4">Sign in</p>

                    <input type="email" id="defaultLoginFormEmail" value={this.state.email} onChange = { this.onChangeEmail } className="form-control mb-4" placeholder="E-mail" required/>

                    <input type="password" id="defaultLoginFormPassword" onChange={this.onChangePassword} value={this.state.password} className="form-control mb-4" placeholder="Password" required/>

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
