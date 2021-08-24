import React, { Component } from 'react';
import './viewDashboard.css';
import Sidebar from './Sidebar';
import FeaturesDashboard from './FeaturesDashboard';


class ViewDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classId: this.props.match.params.id,
        }

        this.handleSelectClassId = this.handleSelectClassId.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleFail = this.handleFail.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ classId: nextProps.match.params.id });
    }  

    handleSelectClassId = (id) => {
        this.props.history.push(`/lecturer/dashboard/${id}`);
        this.setState({
            classId: id
        })
    }

    handlePass(id) {
        this.props.history.push(`/lecturer/predictedStudents/${id}/1`);
    }

    handleFail(id) {
        this.props.history.push(`/lecturer/predictedStudents/${id}/0`);
    }

    render() {
        return (   
            <div className="containers">
                <Sidebar onSelectClassId = {this.handleSelectClassId}/>
                <FeaturesDashboard selectedClassId = {this.state.classId} onPredictedPass = {this.handlePass} onPredictedFail = {this.handleFail} />
            </div>
        );
    }
}

export default ViewDashboard;