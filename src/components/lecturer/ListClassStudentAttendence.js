import React from 'react';
import TabNav from './TabNav';
import Tab from "./Tab";
import LecturerService from '../../services/LecturerService';



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
        this.props.history.push(`/lecturer/attendance/`+this.state.value)
    }

 

    render(){
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

                        {/* WIP */}
                        
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