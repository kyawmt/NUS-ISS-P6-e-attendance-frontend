import React, { Component } from 'react';
import logo from '../media/1_logo.png';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark header-navbar h-auto">
                        <div><a href="https://www.nus.edu.sg/" className="navbar-brand"><img src={logo} alt="logo"  height="60" /></a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;