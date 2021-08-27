import React, { Component } from 'react';
import AdminService from '../../services/AdminService';

class ViewModuleAttendence extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.match.params.id,
            classes:[],
            module:{}
        }
        this.viewClassDeatils=this.viewClassDeatils.bind(this);
    }

    componentDidMount(){
        AdminService.getClassByModuleId(this.state.id).then((res)=>{
            this.setState({ classes: res.data});
        });

        AdminService.getModuleById(this.state.id).then(res=>{
            this.setState({
                module:res.data
            })
        });
    }

    viewClassDeatils(id){
        this.props.history.push(`/admin/class-students-attendance/${id}`);
    }
    
    render() {
        return (
            <div>
                <h2 className="text-center" style={{marginTop:"30px"}}> Module {this.state.module.code}</h2>
                
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th> Academic Year </th>
                            <th> Semester </th>
                            <th> Class Code </th>
                            <th> Attendance Rate </th>
                            <th> Details </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.classes.map(
                                c=>
                                <tr key={c.id}>
                                    <td> {c.year} </td>
                                    <td> {c.semester} </td>
                                    <td> {c.code} </td> 
                                    <td> {c.rate} </td>
                                    <td>
                                        <button className="btn btn-outline-info" onClick={()=>this.viewClassDeatils(c.id)}>Details</button>
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

export default ViewModuleAttendence;