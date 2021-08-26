import React, { Component } from 'react';
import LecturerService from '../../services/LecturerService';
import ReactPaginate from 'react-paginate';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            perPage: 5,
            page: 0,
            pages: 0,
        };

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        
        LecturerService.getClassById().then(
            response => this.setState({
                classes: response.data,
                pages: Math.ceil(response.data.length/ this.state.perPage)
            })
        )
    }

    handleClick(classId) {
        this.props.onSelectClassId(classId)
    }

    render() {

        const {page, perPage,  classes} = this.state;
            let items = classes.slice(page * perPage, (page + 1) * perPage);
            let data = items.map(_class => {
                return(
                    <div>
                    <li className="classItem" key={_class.id}>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => this.handleClick(_class.id)}>
                            {_class.year} {_class.semester} <br/> {_class.modulecode}
                        </button>
                    </li>
                    <br/>
                    </div>
                )
            })

        return (
            <div className="sidebar">
                <div className="classes">
                    <h3 className="classesTitle">Classes</h3>
                    <ul className="classList">
                        {data}
                    </ul>
                </div>
                <div className="sideBarPagination">
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    pageCount={this.state.pages}
                    // marginPagesDisplayed={2}
                    // pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    // pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                />
                </div>
            </div>
        );
    }
}

export default Sidebar;