import React, { Component } from 'react';
import logo from '../media/1_logo.png';

class HeaderComponent extends Component {
    logout = () => {
        sessionStorage.removeItem("fullname");
        sessionStorage.removeItem("token");
        window.location.href = "/"
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark header-navbar h-auto">
                        <div><a href="https://www.nus.edu.sg/" className="navbar-brand"><img src={logo} alt="logo" height="60" /></a></div>
                        {sessionStorage.getItem("fullname") && <div><h4>welcome! {sessionStorage.getItem("fullname")}</h4></div>}
                        {sessionStorage.getItem("token") && <div onClick={this.logout} style={{ marginLeft: "50px" }}><h4>logout</h4></div>}
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;