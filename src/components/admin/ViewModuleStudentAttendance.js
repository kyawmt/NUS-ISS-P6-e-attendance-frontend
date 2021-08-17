import React, { Component } from 'react';
import AdminService from '../../services/AdminService';
import ReactPaginate from 'react-paginate';

class ViewModuleStudentAttendence extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.match.params.id,
            students:[],
            classinfo:{},
            moduleid:'',

            perPage: 3,
            page: 0,
            pages: 0,
        }
        this.back=this.back.bind(this);
    }

    componentDidMount(){
        AdminService.getStudentsByClassId(this.state.id).then((res)=>{
            this.setState({ 
                students: res.data,
                pages: Math.ceil(res.data.length/ this.state.perPage)
            });
        });

        AdminService.getClassInfoByClassId(this.state.id).then((res)=>{
            let classinfo=res.data;
            this.setState({ 
                classinfo: res.data,
                moduleid:classinfo.moduleid,
                pages: Math.ceil(res.data.length/ this.state.perPage)
            });
        });

        console.log(this.state.pages);
        console.log(this.state.moduleid);
    }

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }

    getSendEmailButton(reachMinAttendanceOrNot,studentId){
        if(reachMinAttendanceOrNot===0){
            return <button className="btn btn-outline-info" onClick={()=>this.sendEmail(studentId)}>Send Email</button>;
        }
    }

    // sendEmail(id){
    // }

    back(moduleid){
        this.props.history.push(`/admin/module-classes-attendance/${moduleid}`);
    }

    render() {
            const {page, perPage, pages, students} = this.state;
            let items = students.slice(page * perPage, (page + 1) * perPage);
            let data = items.map( student => {
                return (
                    <tr key={student.id}>
                        <td> {student.studentId} </td>
                        <td> {student.firstName} </td>
                        <td> {student.lastName} </td>
                        <td> {student.rate} </td>
                        <td>
                            {this.getSendEmailButton(student.reachMinAttendanceOrNot,student.id)}
                            
                        </td>
                    </tr>
                 )})
        

        return (
            
            <div>
                 
                <p style={{marginTop:"30px"}}>
                    Module Code: {this.state.classinfo.modulecode},  
                    Class Code: {this.state.classinfo.code}
                </p>
                <p>
                    Academic Year: {this.state.classinfo.year},  
                    Semester: {this.state.classinfo.semester}
                </p>
                
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th> Student Id </th>
                            <th> First Name </th>
                            <th> Last Name </th>
                            <th> Attendance Rate </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>

                <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        pageCount={this.state.pages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        previousLinkClassName={'page-link'}
                        nextLinkClassName={'page-link'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                    />

                <button className="btn btn-dark" onClick={this.back.bind(this)} >Back</button>
                
            </div>
        );
    }
}

export default ViewModuleStudentAttendence;