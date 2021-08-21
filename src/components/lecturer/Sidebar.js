import React, { Component } from 'react';
import LecturerService from '../../services/LecturerService';
import FeaturesDashboard from './FeaturesDashboard';
import './sidebar.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lecturerId: 2, //Assumption (After login lecturer id is 2)
            classes: [],
        };

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        LecturerService.getClassById(this.state.lecturerId).then(
            response => this.setState({
                classes: response.data
            })
        )
    }

    handleClick(classId) {
        this.props.onSelectClassId(classId)
    }

    render() {

        let data = this.state.classes.map(_class => {
                return(
                    <div>
                    <li className="classItem">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => this.handleClick(_class.id)}>
                            {_class.year} {_class.semester} <br/> {_class.modulecode}
                        </button>
                    </li>
                    <br/>
                    </div>
                )
            })


        return (
            <div className="sidebar">
                <div className="classes">
                    <h3 className="classesTitle">Classes</h3>
                    <ul className="classList">
                        {data}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;