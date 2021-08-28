import React from 'react';
import TabNav from './TabNav';
import Tab from "./Tab";
import LecturerService from '../../services/LecturerService';
import {Pie} from 'react-chartjs-2';



class ListClassStudentAttendance extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            selected: "Overview",
            absent:[],
            present:[],
            schedules: [],
            overview: [],
            value : 0,
            names: [],
            date:"",
            moduleName:""
            
        }
        this.getOverviewFromSelection = this.getOverviewFromSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backhome = this.backhome.bind(this);
        this.viewLOA = this.viewLOA.bind(this);
    }
    


    componentDidMount(){

        const {id} = this.props.match.params;

        LecturerService.getAbsentStudentBySelecting(id).then((response)=>{
            this.setState({absent: response.data})
        });
        LecturerService.getListofSchedule().then((response)=>{
            this.setState({schedules:response.data})
        });
        LecturerService.getPresentStudentBySelecting(id).then((response)=>{
            this.setState({present:response.data})
        });

        LecturerService.getOverviewFromSelection(id).then((response) =>{
            this.setState({overview:response.data})
        })

        LecturerService.getNameandDate(id).then((response) =>{
            this.setState({names:response.data})
        })

        this.state.value = {id}
        
    }
    getOverviewFromSelection(id){
        this.props.history.push(`/lecturer/overview/${id}`)
    }

    

    setSelected = (tab) =>{
        this.setState({selected:tab});
    }

    handleChange = event => {
        this.setState({value:event.target.value})
    }

    handleSubmit(event){
        this.props.history.push(`/lecturer/overview/`+this.state.value)
    }

    backhome(event){
        this.props.history.push(`/lecturer/home`)
    }

    viewLOA(event){
        this.props.history.push(`/lecturer/viewLOA`)
    }

   

    

 

    render(){
        
        const data = [
            {name: 'Present', value: this.state.overview.Present},
            {name: 'Absent Without Valid Reason', value: this.state.overview.AbsentwithoutvalidReason},
            {name: 'Absent With Valid Reason', value: this.state.overview.AbsentwithvalidReason}
        ];

        const noofenrolment = this.state.overview.totalSize;

        const absentwithreason = this.state.overview.AbsentwithvalidReason;
        const absentwovalidreason = this.state.overview.AbsentwithoutvalidReason;
        const absentee =this.state.overview.AbsentwithoutvalidReason+this.state.overview.AbsentwithvalidReason;
        const present = this.state.overview.Present;

        const date = this.state.names.scheduleDate;
        const name = this.state.names.moduleName;    
        const state = {
            labels: ['Absent With Valid Reason','Absent Without Valid Reason','Present'],
            datasets: [
              {
                label: 'Attendance Overview',
                backgroundColor: [
                  '#B21F00',
                  '#C9DE00',
                  '#2FDE00'
                ],
                hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000'
                ],
                data: [absentwithreason,absentwovalidreason,present]
              }
            ]
        }

        if (noofenrolment === 0){
            return (

                <div>               
                <form onSubmit = {this.handleSubmit}>
        
                <select value = {this.state.value} onChange={this.handleChange}> <option> Please select a schedule </option>
                            {this.state.schedules.map(s => <option value = {s.id}>
                         {s._class.module.code} {s._class.module.name} {s.date}
                        </option>)}
                        </select >                    
                        <input type="submit" value = "Submit"/> 
                        </form>    

                
                
                <div> No students found! Are you sure there are students being enrolled?</div>

                </div>
            )
        }       

        return (
            <div>               
                
                <form onSubmit = {this.handleSubmit}>
        
                <select value = {this.state.value} onChange={this.handleChange}> <option> Please select a schedule </option>
                            {this.state.schedules.map(s => <option value = {s.id}>
                         {s._class.module.code} {s._class.module.name} {s.date}
                        </option>)}
                        </select >                    
                        <input type="submit" value = "Submit"/> 
                        </form>    

            <div>
                <TabNav tabs = {['Overview','Present','Absent']} selected={this.state.selected} setSelected={this.setSelected}>
                    <Tab isSelected={this.state.selected === 'Overview'}>
                     <Pie                        
                        data={state}
                        width= {400}
                        height = {400}
                        options={{
                            maintainAspectRatio: false,
                            title:{
                            display:true,
                            text:'Overview of Attendance',
                            fontSize:20
                            },
                        legend:{
                            display:true,
                            position:'left'
                            }
                        }}
                         />              
                    </Tab>
                    <Tab isSelected={this.state.selected === 'Present'}>
                        <p> </p>
                        <h2> Present Students </h2>
                        <p> </p>
                    <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> S/No </td>
                            <td> Matric No </td>
                            <td> Student Name </td>
                            <td> Student Email </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.present.map(
                                presents =>
                                <tr key = {presents.id}>
                                    <td>{presents.id}</td>
                                    <td>{presents.studentId}</td>
                                    <td>{presents.firstName} {presents.lastName}</td>
                                    <td>{presents.userName}@u.nus.edu</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                    </Tab>
                    <Tab isSelected={this.state.selected === 'Absent'}>
                    <p> </p>
                        <h2> Absent Students </h2>
                        <p> </p>
                    <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> S/No </td>
                            <td> Matric No </td>
                            <td> Student Name </td>
                            <td> Student Email </td>
                            <td> View LOA </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.absent.map(
                                absents =>
                                <tr key = {absents.id}>
                                    <td>{absents.id}</td>
                                    <td>{absents.studentId}</td>
                                    <td>{absents.firstName} {absents.lastName}</td>
                                    <td>{absents.userName}@u.nus.edu</td>
                                    <td> <button className="btn btn-primary" onClick = {this.viewLOA}> View LOA </button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                

                    </Tab>
      

                </TabNav>
                <button
                className="btn btn-primary" onClick= {this.backhome}> Back </button>

            </div>   
            
            </div>
        );
    }
} 
export default ListClassStudentAttendance