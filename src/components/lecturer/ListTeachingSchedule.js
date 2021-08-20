import React, { Component } from 'react';

import LecturerService from '../../services/LecturerService';

class ListTeachingSchedule extends Component {

    constructor(props){
        super(props)
        this.state={
            schedules:[]
        }

        this.createQRCode = this.createQRCode.bind(this);
        
    }

    componentDidMount(){
        LecturerService.getSchedules().then((res) => {
            this.setState({schedules: res.data})
        });
    }

    createQRCode(id, option){
        this.props.history.push(`/lecturer/qrcode/${id}/${option}`)
    }


    render() {
        return (
            <div>
                <h1 className="text-center">Schedules</h1>
                
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
                        {
                            this.state.schedules.map(
                                schedule=>
                                <tr key={schedule.id}>
                                    <td> {schedule._class.module.code} </td>
                                    <td> {schedule._class.module.name} </td>
                                    <td> {schedule._class.size} </td>
                                    <td> {schedule.date} </td>
                                    <td>
                                        <button className="btn btn-outline-info" onClick={()=>this.createQRCode(schedule.id, "signIn")}>Gen. QR Code</button>                                        
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-info" onClick={()=>this.createQRCode(schedule.id, "signOut")}>Gen. QR Code</button>                                        
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListTeachingSchedule;