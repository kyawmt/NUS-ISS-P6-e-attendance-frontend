import React, { Component } from "react";
import { renderIntoDocument } from "react-dom/cjs/react-dom-test-utils.production.min";
import logo from "../media/1_logo.png";

class HeaderComponent extends Component {
  logout = () => {
    sessionStorage.removeItem("fullname");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    window.location.href = "/";
  };

  mainpage = () => {
    let role = sessionStorage.getItem("role");
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
  };

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-dark header-navbar h-auto">
            <div onClick={this.mainpage}>
              <a className="navbar-brand homeBtn">
                <img src={logo} alt="logo" height="60" />
              </a>
            </div>
            {sessionStorage.getItem("fullname") && (
              <div>
                <h2>Welcome! {sessionStorage.getItem("fullname")}</h2>
              </div>
            )}
            {sessionStorage.getItem("token") && (
              <div onClick={this.logout}>
                <h4>Logout</h4>
              </div>
            )}
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
