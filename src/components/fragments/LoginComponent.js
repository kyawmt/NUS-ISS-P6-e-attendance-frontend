import React, { Component } from 'react';
import ParticleBackground from './ParticleBackground';

class LoginComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            userName:'', 
            password:''
        }
    }


    changeUserNameHandlers=(event)=>{
        this.setState({userName:event.target.value});
    }
    changePasswordHandlers=(event)=>{
        this.setState({password:event.target.value});
    }

    render() {
        return (
            <div>
                <div className="particles-js">
                    <ParticleBackground />
                </div>
                
                <div className="card col-md-6 offset-md-3" style={{marginTop:"70px"}}>
                            <h3 className="text-center" style={{marginTop:"10px"}}>Login Page</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>User Name: </label>
                                        <input placeholder="Enter User Name" name="userName" className="form-control" 
                                        value={this.state.userName} onChange={this.changeUserNameHandlers}/>
                                    </div>
                                    <div className="form-group" style={{marginTop:"10px"}}>
                                        <label>First Name: </label>
                                        <input placeholder="Enter Password" name="password" className="form-control" 
                                        value={this.state.password} onChange={this.changePasswordHandlers}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveLecturer} style={{marginTop:"10px",marginLeft:"180px"}}>Login</button>
                                </form>
                            </div>
                        </div>
            </div>
        );
    }
}

export default LoginComponent