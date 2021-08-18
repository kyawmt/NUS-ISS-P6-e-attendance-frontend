import React, { Component } from 'react';
import './sidebar.css'

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="classes">
                    <h3 className="classesTitle">Classes</h3>
                    <ul className="classList">
                        <li className="classItem">
                            <button type="button" className="btn btn-secondary btn-sm">Academic Period/Class Name 1</button>
                        </li>
                        <br/>
                        <li className="classItem">
                        <button type="button" className="btn btn-secondary btn-sm">Academic Period/Class Name 2</button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;