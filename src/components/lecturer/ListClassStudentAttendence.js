import React from 'react';
import TabNav from './TabNav';
import Tab from "./Tab";
import LecturerService from '../../services/LecturerService';
import {PieChart, Pie} from 'recharts';



class ListClassStudentAttendance extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            selected: "Overview",
            absent:[],
            present:[],
            schedules: [],
            overview: [],
            value : 0
            
        }
        this.getOverviewFromSelection = this.getOverviewFromSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        this.state.value = {id}
        
    }
    getOverviewFromSelection(id){
        this.props.history.push(`/lecturer/attendance/${id}`)
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

 

    render(){
        
        const data = [
            {name: 'Present', value: this.state.overview.Present},
            {name: 'Absent Without Valid Reason', value: this.state.overview.AbsentwithoutvalidReason},
            {name: 'Absent With Valid Reason', value: this.state.overview.AbsentwithvalidReason}
        ];

        const absentee =this.state.overview.AbsentwithoutvalidReason+this.state.overview.AbsentwithvalidReason;
        const present = this.state.overview.Present;

        return (
            <div> 
                <form onSubmit = {this.handleSubmit}>
        
                <select value = {this.state.value} onChange={this.handleChange}>
                            {this.state.schedules.map(s => <option value = {s.id}>
                         {s._class.module.name} {s.date}
                        </option>)}
                        </select > 
                        
                        <input type="submit" value = "Submit"/> 
                        </form>            
            <div className ="App mt-4">
                <TabNav tabs = {['Overview','Present','Absent']} selected={this.state.selected} setSelected={this.setSelected}>
                    <Tab isSelected={this.state.selected === 'Overview'}>
                        <PieChart width={400} height={400}>
                            <Pie data={data} dataKey="value" cx={200} cy={220} outerRadius={150} fill="#8884d8" label="name"/>
                        </PieChart>  
                        <p>Number of Student Absent: {absentee} </p> 
                        <p>Number of Student Present: {present} </p>                      
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
                                    <td> <button className="btn btn-primary"> View LOA </button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                    </Tab>

                </TabNav>

            </div>
            </div>

        );
    }
} 
export default ListClassStudentAttendance