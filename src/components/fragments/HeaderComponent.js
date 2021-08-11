import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="https://www.nus.edu.sg/" className="navbar-brand">E-Attendance</a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;