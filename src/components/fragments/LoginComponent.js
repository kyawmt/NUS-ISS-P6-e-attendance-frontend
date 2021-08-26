import React, { Component } from 'react';
import ParticleBackground from './ParticleBackground';
import axios from 'axios';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }


    changeUserNameHandlers = (event) => {
        this.setState({ username: event.target.value });
    }
    changePasswordHandlers = (event) => {
        this.setState({ password: event.target.value });
    }

    login = (e) => {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password,
        };

        console.log('user=> ' + JSON.stringify(user));

        axios.post("http://localhost:8080/token", user).then(res => {
            let token = res.headers.jwttoken;
            let fullname = res.headers.fullname;
            let role = res.headers.role;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('fullname', fullname);
            sessionStorage.setItem('role', role);

            switch (role) {
                case "admin":
                    window.location.href = "/admin/home";
                    break;
                case "lecturer":
                    window.location.href = "/lecturer/home";
                    break;
                default:
                    break;
            }
        }
        )
    }

    render() {
        return (
            <div>
                <div className="particles-js">
                    <ParticleBackground />
                </div>

                <div className="card col-md-6 offset-md-3" style={{ marginTop: "70px" }}>
                    <h3 className="text-center" style={{ marginTop: "10px" }}>Login Page</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>User Name: </label>
                                <input placeholder="Enter User Name" name="userName" className="form-control"
                                    value={this.state.userName} onChange={this.changeUserNameHandlers} />
                            </div>
                            <div className="form-group" style={{ marginTop: "10px" }}>
                                <label>Password: </label>
                                <input type="password" placeholder="Enter Password" name="password" className="form-control"
                                    value={this.state.password} onChange={this.changePasswordHandlers} />
                            </div>
                            <button className="btn btn-success" onClick={this.login} style={{ marginTop: "10px", marginLeft: "180px" }}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent