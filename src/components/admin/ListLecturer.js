import React from 'react';
import { Route , withRouter} from 'react-router-dom';
import AdminService from '../../services/AdminService';
import ReactPaginate from 'react-paginate';

class ListLecturer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            lecturers:[],
            perPage: 3,
            page: 0,
            pages: 0
        }
        this.addLecturer=this.addLecturer.bind(this);
        this.editLecturer=this.editLecturer.bind(this);
        this.deleteLecturer=this.deleteLecturer.bind(this);
        this.listStudent=this.listStudent.bind(this);
    }

    deleteLecturer(id){
        AdminService.deleteLecturer(id).then(res => {
            this.setState({
                lecturers: this.state.lecturers.filter(lecturer=>lecturer.id!==id),
                pages: Math.ceil(this.state.lecturers.filter(lecturer=>lecturer.id!==id).length/ this.state.perPage)
            });
        });
    }

    editLecturer(id){
        this.props.history.push(`/admin/add-lecturer/${id}`);
    }

    componentDidMount(){
        AdminService.getLecturers().then((res) => {
            this.setState({
                lecturers: res.data,
                pages: Math.ceil(res.data.length/ this.state.perPage)
            })
        });
    }

    addLecturer(){
        this.props.history.push('/admin/add-lecturer/-1');
    }

    listStudent() {
        this.props.history.push("/admin/students");
    }

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }

    render(){
        if(this.state.lecturers.length !== 0) {

            const {page, perPage, pages, lecturers} = this.state;
            let items = lecturers.slice(page * perPage, (page + 1) * perPage);
            let data = items.map( lecturer => {
                return (
                    <tr key={lecturer.id}>
                        <td>{lecturer.staffId}</td>
                        <td>{lecturer.firstName}</td>
                        <td>{lecturer.lastName}</td>
                        <td>{lecturer.userName}</td>
                        <td><button className="btn btn-outline-info" onClick= {() => this.editLecturer(lecturer.id)}>Edit</button></td>
                        <td><button className="btn btn-outline-danger" onClick= {() => this.deleteLecturer(lecturer.id)}>Delete</button></td>
                    </tr>
                )  
            })
            return (
                <div>
                    <h1 className="text-center">Lecturer List</h1>
                    <div >
                        <button className="btn btn-primary" onClick={this.addLecturer}>
                            Create Lecturer
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={this.listStudent}>Student</button>
                    </div>
                    <table className="table table-hover ">
                        <thead>
                            <tr>
                                <th> Staff Id </th>
                                <th> First Name </th>
                                <th> Last Name </th>
                                <th> User Name </th>
                                <th> Edit Lecturer </th>
                                <th> Delete Lecturer </th>
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
                <h1>Lecturer List</h1>
                <h3>No lecturers currently</h3>
                <div>
                    <button className="btn btn-primary" onClick={this.addLecturer}>Create Lecturer</button>
                    &nbsp;&nbsp;
                    <button className="btn btn-primary" onClick={this.listStudent}>Student</button>
                </div>
            </div>
            )
        }
        
    }
}

export default withRouter(ListLecturer)