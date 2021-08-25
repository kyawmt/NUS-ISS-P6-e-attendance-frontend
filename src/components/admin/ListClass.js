import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import AdminService from '../../services/AdminService';

class ListClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            perPage: 3,
            page: 0,
            pages: 0,
        };

        this.enrollStudents=this.enrollStudents.bind(this);
        this.viewEnrolledStudents=this.viewEnrolledStudents.bind(this);
    }

    componentDidMount() {
        AdminService.getClasses().then(res =>{
            this.setState({
                classes: res.data,
                pages: Math.ceil(res.data.length/ this.state.perPage)
            });
        })

        console.log(this.state.pages);
    }

    enrollStudents(id){
        this.props.history.push(`/admin/class-enroll-students/${id}`);
    }

    viewEnrolledStudents(id){
        this.props.history.push(`/admin/class-view-students/${id}`);
    }

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }
    
    
    render() {
        const {page, perPage, pages, classes} = this.state;
            let items = classes.slice(page * perPage, (page + 1) * perPage);
            let data = items.map( c => {
                return (
                    <tr key={c.id}>
                        <td>{c.code}</td>
                        <td>{c.moduleCode}</td>
                        <td>{c.moduleName}</td>
                        <td>{c.year}</td>
                        <td>{c.semester}</td>
                        <td>{c.lecturerName}</td>
                        <td><button className="btn btn-outline-info" onClick= {() => this.enrollStudents(c.id)}>Enroll</button></td>
                        <td><button className="btn btn-outline-danger" onClick= {() => this.viewEnrolledStudents(c.id)}>View</button></td>
                    </tr>
                )  
            })


        return (
            <div>
                <h1 className="text-center">Class List</h1>
                    
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Class Code</th>
                                <th>Module Code</th>
                                <th>Module Name</th>
                                <th>Academic Year</th>
                                <th>Semester</th>
                                <th>Lecturer</th>
                                <th>Enroll</th>
                                <th>View</th>
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
}

export default ListClass;