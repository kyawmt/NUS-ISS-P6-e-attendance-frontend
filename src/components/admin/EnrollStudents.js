import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import AdminService from '../../services/AdminService';

class EnrollStudents extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.match.params.id,
            studentsNotInClass:[],
            selectedId: [],
            classinfo:{},
            perPage: 3,
            page: 0,
            pages: 0,
        }
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.enrollStudents = this.enrollStudents.bind(this);
    }

    componentDidMount(){
        AdminService.getStudentsNotInClass(this.state.id).then((res)=>{
            this.setState({
                studentsNotInClass: res.data,
                pages: Math.ceil(res.data.length/ this.state.perPage)
            });
        });

        AdminService.getClassInfoByClassId(this.state.id).then((res)=>{
            this.setState({ 
                classinfo: res.data
            });
        });
    } 

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }

    handleCheckBox(e) {
        const { checked, value } = e.target;
        let selectedId= this.state.selectedId;

        if (checked && selectedId.indexOf(value) == -1) {
            selectedId.push(value);               
        } else {    
            selectedId = selectedId.filter(item => item != value);        
        }
        this.setState({ selectedId });
      }

    enrollStudents = (e) =>{
        e.preventDefault();

        let selectedId= this.state.selectedId;
        AdminService.enrollStudents(this.state.id,selectedId).then(res =>{
            this.props.history.push(`/admin/classes`);
        });
    }

    render() {
        const {page, perPage, pages, studentsNotInClass} = this.state;
            let items = studentsNotInClass.slice(page * perPage, (page + 1) * perPage);
            let data = items.map( student => {
                return (
                    <tr key={student.id}>
                        <td>{student.studentId}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.userName}</td>
                        <td>
                        <input type="checkbox" value={student.id} style={{width: "20px",height: "20px"}} 
                             onChange={this.handleCheckBox}/>
                        </td>
                    </tr>
                )  
            })

        return (
            <div>
                <h1 className="text-center">Enroll Students For {this.state.classinfo.code} </h1>
                    <p className="text-center"> 
                        Class Max Size: {this.state.classinfo.maxSize}   &nbsp;
                        Current: {this.state.classinfo.currentSize}    &nbsp;
                        Remaining: {this.state.classinfo.remainingSize}    &nbsp;
                    </p>

                    <form onSubmit={this.handleFormSubmit}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Student Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>

                    <div style={{float: 'right',paddingRight:"80px"}}>
                    <button className="btn btn-outline-info" onClick={this.enrollStudents} style={{float: 'right'}} > Enroll </button>
                    </div>
                    </form>
                    
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

export default EnrollStudents;