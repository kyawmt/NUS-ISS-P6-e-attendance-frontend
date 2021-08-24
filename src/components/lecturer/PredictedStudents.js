import React, { Component } from 'react';
import LecturerService from '../../services/LecturerService';
import ReactPaginate from 'react-paginate';

class PredictedStudents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            index: this.props.match.params.index,
            students: [],
            perPage: 3,
            page: 0,
            pages: 0,
        }

        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        LecturerService.getStudents(this.state.id, this.state.index).then(
            response => {
                this.setState({
                    students: response.data,
                    pages: Math.ceil(response.data.length/ this.state.perPage)
                })
            }
        )
    }

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }

    handleBack() {
        // this.props.history.goBack();
        this.props.history.push(`/lecturer/dashboard/${0}`)
    }

    render() {
        if(this.state.students.length !== 0) {

            const {page, perPage, students} = this.state;
            let items = students.slice(page * perPage, (page + 1) * perPage);
            let data = items.map( student => {
                return (
                    <tr key={student.id}>
                        <td>{student.studentId}</td>
                        <td>{student.firstname}</td>
                        <td>{student.lastname}</td>
                        <td>{student.attendancerate}</td>
                    </tr>
                )  
            })

            return (
                <div>
                    <h1 className="text-center">{this.state.index == 1 ? "Students predicted to pass" : "Students predicted to fail"}</h1>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Student Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Attendance Rate</th>
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
                    <div>
                        <button className="btn btn-primary" onClick={() => this.handleBack()}>Back</button>
                    </div>
                </div>
            );
        } 
        else {
            return (
                <div className="text-center">
                    <h1>Predicted Result</h1>
                    <h3>No students</h3>
                    <div>
                        <button className="btn btn-primary" onClick={() => this.handleBack()}>Back</button>
                    </div>
                </div>
            )
        }
    }
}

export default PredictedStudents;