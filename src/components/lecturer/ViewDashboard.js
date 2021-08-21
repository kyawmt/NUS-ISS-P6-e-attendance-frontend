import React, { Component } from 'react';
import './viewDashboard.css';
import Sidebar from './Sidebar';
import FeaturesDashboard from './FeaturesDashboard';


class ViewDashboard extends Component {
    constructor() {
        super();

        this.state = {
            classId: 0
        }

        this.handleSelectClassId = this.handleSelectClassId.bind(this);
    }

    handleSelectClassId = (id) => {
        this.setState({
            classId: id
        })
        console.log(this.state.classId);
    }

    render() {
        return (   
            <div className="containers">
                <Sidebar onSelectClassId = {this.handleSelectClassId}/>
                <FeaturesDashboard selectedClassId = {this.state.classId} />
            </div>
        );
    }
}

export default ViewDashboard;