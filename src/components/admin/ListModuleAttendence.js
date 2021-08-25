import React, { Component } from 'react';
import AdminService from '../../services/AdminService';

class ListModuleAttendence extends Component {
    constructor(props){
        super(props)
        this.state={
            modules:[]
        }
        this.viewClassAttendance=this.viewClassAttendance.bind(this);
    }

    viewClassAttendance(id){
        this.props.history.push(`/admin/module-classes-attendance/${id}`);
    }

    componentDidMount(){
        AdminService.getModules().then((res)=>{
            this.setState({ modules: res.data});
        });
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Module List</h1>
                
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th> Module Code </th>
                            <th> Module Name </th>
                            <th> View Class Attendance </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.modules.map(
                                module=>
                                <tr key={module.id}>
                                    <td> {module.code} </td>
                                    <td> {module.name} </td>
                                    <td>
                                        <button className="btn btn-outline-info" onClick={()=>this.viewClassAttendance(module.id)}>View</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListModuleAttendence;