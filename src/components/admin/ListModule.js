import React, { Component } from 'react';
import AdminService from '../../services/AdminService';
import ReactPaginate from 'react-paginate';

class ListModule extends Component {
    constructor() {
        super();

        this.state = {
            modules: [],
            perPage: 3,
            page: 0,
            pages: 0,
        };

        this.addModule = this.addModule.bind(this);
        this.editModule = this.editModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
    }

    componentDidMount() {

        AdminService.getModules()
        .then(response =>
            this.setState({
                modules: response.data,
                pages: Math.ceil(response.data.length/ this.state.perPage)
            })
        )

        console.log(this.state.pages);
    }

    addModule() {
        this.props.history.push("/admin/add-Module/-1");
    }

    editModule(id) {
        this.props.history.push(`/admin/add-Module/${id}`);
    }

    deleteModule(id) {
        AdminService.deleteModule(id).then(
            this.setState({
                modules: this.state.modules.filter(module => module.id !== id)
            })
        )
    }

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }
    
    render() {
        if(this.state.modules.length !== 0) {

            const {page, perPage, pages, modules} = this.state;
            let items = modules.slice(page * perPage, (page + 1) * perPage);
            let data = items.map( module => {
                return (
                    <tr key={module.id}>
                        <td>{module.id}</td>
                        <td>{module.code}</td>
                        <td>{module.name}</td>
                        <td>{module.minAttendance}</td>
                        <td><button className="btn btn-outline-info" onClick= {() => this.editModule(module.id)}>edit</button></td>
                        <td><button className="btn btn-outline-danger" onClick= {() => this.deleteModule(module.id)}>delete</button></td>
                    </tr>
                )  
            })

            return (
                <div>
                    <h1 className="text-center">Module</h1>
                    <div>
                        <button className="btn btn-primary" onClick={this.addModule}>Create Module</button>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Module Code</th>
                                <th>Module Name</th>
                                <th>Minimum Attendance</th>
                                <th>Edit</th>
                                <th>Delete</th>
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
                <h1>Module</h1>
                <h3>No modules currently</h3>
                <div>
                    <button className="btn btn-primary" onClick={this.addModule}>Create Module</button>
                </div>
            </div>
            )
        }
    }
}

export default ListModule;