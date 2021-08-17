import React from 'react';
import { Route , withRouter} from 'react-router-dom';
import AdminService from '../../services/AdminService';


class ListLecturer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            lecturers:[]
        }
        this.addLecturer=this.addLecturer.bind(this);
        this.editLecturer=this.editLecturer.bind(this);
        this.deleteLecturer=this.deleteLecturer.bind(this);
    }

    deleteLecturer(id){
        AdminService.deleteLecturer(id).then(res => {
            this.setState({lecturers: this.state.lecturers.filter(lecturer=>lecturer.id!==id)});
        });
    }

    editLecturer(id){
        this.props.history.push(`/admin/add-lecturer/${id}`);
    }

    componentDidMount(){
        AdminService.getLecturers().then((res) => {
            this.setState({lecturers: res.data})
        });
    }

    addLecturer(){
        this.props.history.push('/admin/add-lecturer/-1');
    }

    render(){
        return (
            <div>
                <h1 className="text-center">Lecturer List</h1>
                <div >
                    <button className="btn btn-primary" onClick={this.addLecturer}>
                        Add Lecturer
                    </button>
                </div>
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th> Staff Id </th>
                            <th> First Name </th>
                            <th> Last Name </th>
                            <th> User Name </th>
                            <th> Update Lecturer </th>
                            <th> Delete Lecturer </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.lecturers.map(
                                lecturer=>
                                <tr key={lecturer.id}>
                                    <td> {lecturer.staffId} </td>
                                    <td> {lecturer.firstName} </td>
                                    <td> {lecturer.lastName} </td>
                                    <td> {lecturer.userName} </td>
                                    <td>
                                        <button className="btn btn-outline-info" onClick={()=>this.editLecturer(lecturer.id)}>Update</button>
                                        
                                    </td>
                                    <td>
                                        
                                        <button className="btn btn-outline-danger" onClick={()=>this.deleteLecturer(lecturer.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(ListLecturer)