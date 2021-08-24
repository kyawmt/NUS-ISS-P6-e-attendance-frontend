import React, { Component } from 'react';
import Countdown from 'react-countdown';
import QRCode from 'react-qr-code';
import LecturerService from '../../services/LecturerService';

class ViewClassQRCode extends Component {

    constructor(props){
        super(props)

        this.state={            
            id: this.props.match.params.id,            
            option: this.props.match.params.option,
            ModuleCode:"",
            ModuleName:"",
            Date:"",
            QRCodeData:"",
            remainingTime: 5000,
            attendance: ""
        }

        this.getAttendance = this.getAttendance.bind(this);
    }

    getAttendance(){
        LecturerService.getScheduleAttendance(this.state.id, this.state.option).then((res) =>{
            this.setState({
                attendance: res.data,   
                remainingTime: 0    
            });
        });

    }

    componentDidMount(){
        LecturerService.getSchedulebyId(this.state.id).then((res) => {
            let schedule = res.data;
            this.setState({
                ModuleCode: schedule._class.module.code,
                ModuleName: schedule._class.module.name,
                Date: schedule.date
            });
        });
        
        LecturerService.getQRCodeData(this.state.id, this.state.option).then((res) =>{
            let qrCodeData = res.data;                          
            this.setState({
                QRCodeData: qrCodeData.qrCodeData,                
                remainingTime: qrCodeData.finishTime - Date.now()                
                
            });

        });
    }

    render() {
               
        // Renderer callback with condition
        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {   
                
                if(this.state.attendance==""){
                    this.getAttendance();
                }
                
                return( 
                    <div>                                                   
                        <span>Time's Up!</span><br/><br/>                         
                        <span>Attendance: {this.state.attendance}</span><br/>            
                    </div>
                );

            } else {
                // Render a countdown
                return( 
                    <div>    
                        <span>{hours}:{minutes}:{seconds}</span>
                        <br/>                                                            
                        <QRCode value = {this.state.QRCodeData} />  
                    </div>
                );
            }
        };

        
        return (
            <div>
                <h2 className="text-left">Teaching Schedule</h2>
                <h3 className="text-left">Please scan the QR Code for your atttendance</h3>

                <div>
                    Module Code: {this.state.ModuleCode} <br/>
                    Module Name: {this.state.ModuleName} <br/>
                    Date: {this.state.Date} <br/>   

                    <Countdown date={Date.now() + this.state.remainingTime} renderer={renderer}/><br/>  
                                                                                                                                                             
                                 
                </div>

                
            </div>
        );
    }
}

export default ViewClassQRCode;