import React, { Component } from 'react';
import AdminService from '../../services/AdminService';
import ReactPaginate from 'react-paginate';

class ListStudent extends Component {
    constructor() {
        super();

        this.state = {
            students: [],
            perPage: 3,
            page: 0,
            pages: 0
        };

        this.listLecturer = this.listLecturer.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    componentDidMount() {

        AdminService.getStudents()
        .then(response =>
            this.setState({
                students: response.data,
                pages: Math.ceil(response.data.length/ this.state.perPage)
            })
        )

    }

    listLecturer() {
        this.props.history.push("/admin/lecturers");
    }

    addStudent() {
        this.props.history.push("/admin/add-student/-1");
    }

    editStudent(id) {
        this.props.history.push(`/admin/add-student/${id}`);
    }

    deleteStudent(id) {
        AdminService.deleteStudent(id).then(
            this.setState({
                students: this.state.students.filter(student => student.id !== id),
                pages: Math.ceil(this.state.students.filter(student => student.id !== id).length/ this.state.perPage)
            })
        )
    }

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }

    render() {
        if(this.state.students.length !== 0) {

            const {page, perPage, pages, students} = this.state;
            let items = students.slice(page * perPage, (page + 1) * perPage);
            let data = items.map( student => {
                return (
                    <tr key={student.id}>
                        <td>{student.studentId}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.userName}</td>
                        <td><button className="btn btn-outline-info" onClick= {() => this.editStudent(student.id)}>Edit</button></td>
                        <td><button className="btn btn-outline-danger" onClick= {() => this.deleteStudent(student.id)}>Delete</button></td>
                    </tr>
                )  
            })

            return (
                <div>
                    <h1 className="text-center">Student List</h1>
                    <div>
                        <button className="btn btn-primary" onClick={this.addStudent}>Create Student</button>
                        &nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={this.listLecturer}>Lecturer</button>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Student Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>User Name</th>
                                <th>Edit Student</th>
                                <th>Delete Student</th>
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
                </div>
            );
        } 
        else {
            return (
                <div className="text-center">
                <h1>Student List</h1>
                <h3>No students currently</h3>
                <div>
                    <button className="btn btn-primary" onClick={this.addStudent}>Create Student</button>
                    &nbsp;&nbsp;
                    <button className="btn btn-primary" onClick={this.listLecturer}>Lecturer</button>
                </div>
            </div>
            )
        }
    }
}

export default ListStudent;