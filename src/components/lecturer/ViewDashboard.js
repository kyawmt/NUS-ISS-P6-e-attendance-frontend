import React, { Component } from 'react';
import './viewDashboard.css';
import Sidebar from './Sidebar';
import FeaturesDashboard from './FeaturesDashboard';


class ViewDashboard extends Component {
    render() {
        return (   
            <div className="containers">
                <Sidebar />
                <FeaturesDashboard/>
            </div>
        );
    }
}

export default ViewDashboard;