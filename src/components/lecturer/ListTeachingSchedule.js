import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import ReactPaginate from 'react-paginate';

import "react-datepicker/dist/react-datepicker.css";
import LecturerService from '../../services/LecturerService';
class ListTeachingSchedule extends Component {

    constructor(props){
        super(props)
        this.state={
            schedules:[],
            perPage: 3,
            page: 0,
            pages: 0,
            startDate: new Date(),
            endDate: new Date()
        }

        this.createQRCode = this.createQRCode.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.filterSchedule = this.filterSchedule.bind(this);
        
        this.back = this.back.bind(this);        
    }

    back() {
        this.props.history.push(`/lecturer/home`);
    }

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }

    handleStartDateChange(date){
        this.setState({
            startDate: date
        })
    }

    handleEndDateChange(date){
        this.setState({
            endDate: date
        })
    }

    filterSchedule() {       
               
        LecturerService.getSchedulesByRange(Date.parse(this.state.startDate), Date.parse(this.state.endDate)).then((res) => {
            this.setState({
                schedules: res.data,
                pages: Math.ceil(res.data.length/ this.state.perPage)
            })
        });
        
      }

    componentDidMount(){
        LecturerService.getLecturerTodaySchedule().then((res) => {
            this.setState({
                schedules: res.data,
                pages: Math.ceil(res.data.length/ this.state.perPage)
            })
        });
    }

    createQRCode(id, option){
        this.props.history.push(`/lecturer/qrcode/${id}/${option}`)
    }


    render() {
        if(this.state.schedules.length !== 0) {

            const {page, perPage, pages, schedules} = this.state;
            let items = schedules.slice(page * perPage, (page + 1) * perPage);
            let data = items.map( schedule => {
                return (
                    <tr key={schedule.id}>
                        <td>{schedule._class.module.code}</td>
                        <td>{schedule._class.module.name}</td>
                        <td>{schedule._class.size}</td>
                        <td>{schedule.date}</td>
                        <td>
                            <button className="btn btn-outline-info" onClick={()=>this.createQRCode(schedule.id, "signIn")} style={{ backgroundColor: schedule.signInId ? '#605b66' : '' }}>Gen. QR Code</button>
                        </td>
                        <td>
                            <button className="btn btn-outline-info" onClick={()=>this.createQRCode(schedule.id, "signOut")} style={{ backgroundColor: schedule.signOutId ? '#605b66' : '' }}>Gen. QR Code</button>
                        </td>
                    </tr>
                )  
            })

            return (
                <div>
                    <h1 className="text-left">Teaching Schedule</h1>
                    <br></br>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Start Date: 
                                </td>
                                <td>
                                <DatePicker
                                    selected={ this.state.startDate }
                                    onChange={ this.handleStartDateChange }
                                    name="startDate"
                                    dateFormat="dd/MM/yyyy"
                                />
                                </td>

                                <td>
                                    End Date: 
                                </td>
                            
                                <td>
                                                    
                                <DatePicker
                                    selected={ this.state.endDate }
                                    onChange={ this.handleEndDateChange }
                                    name="endDate"
                                    dateFormat="dd/MM/yyyy"
                                />
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={ this.filterSchedule }>Filter</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>  

                    <table className="table table-hover ">
                        <thead>
                            <tr>
                                <th> Module Code </th>
                                <th> Module Name </th>
                                <th> Class Size </th>
                                <th> Class Date </th>
                                <th> QR (IN) </th>
                                <th> QR (OUT) </th>
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
                    
                    <button className="btn btn-dark" onClick={()=>this.back()} >Back</button>

                </div>
            );

        }else{

            return (
                <div className="text-center">
                    <h1>Teaching Schedule</h1>
                    <h3>No Schedule currently</h3>

                    <button className="btn btn-dark" onClick={()=>this.back()} >Back</button>
                    
                </div>
            )
        }
    }
}

export default ListTeachingSchedule;