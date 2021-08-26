import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import LecturerService from '../../services/LecturerService';

class FeaturesDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.selectedClassId,
            class: "",
            attendance: [],
        };

        this.handlePass = this.handlePass.bind(this);
        this.handleFail = this.handleFail.bind(this);
    }

    componentDidMount() {

        if(this.state.id != 0) {
            LecturerService.getClassByClassId(this.state.id).then(
                response => 
                this.setState({
                    class: response.data
                })
            );
    
            LecturerService.getAttendanceByClassId(this.state.id).then(
                response => 
                this.setState({
                    attendance: response.data
                })
            ); 
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ id: nextProps.selectedClassId });  

        LecturerService.getClassByClassId(nextProps.selectedClassId).then(
            response => 
            this.setState({
                class: response.data
            })
        );

        LecturerService.getAttendanceByClassId(nextProps.selectedClassId).then(
            response => 
            this.setState({
                attendance: response.data
            })
        );

        console.log(this.state.attendance);
    }

    handlePass() {
        this.props.onPredictedPass(this.state.id);
    }

    handleFail() {
        this.props.onPredictedFail(this.state.id);
    }

    render() {

        const dataPie = [
            { name: 'Group A', value: this.state.class.performancePass},
            { name: 'Group B', value: this.state.class.performanceFail},
          ];
          
        const COLORS = ['#77DD77', '#FA8072'];
        
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          );
        };
        
        if(this.state.id == 0) {
            return (
                <div className="allFeatures"></div>
            )
        }
        else {
            return (
                <div className="allFeatures">
                    <div className="featured">
                        <div className="featuredItem">
                            <h4 className="featuredTitle">Class Information</h4>
                            <div className="featuredInfo">
                                <span className="moduleName">{this.state.class.modulecode}<br/>{this.state.class.modulename}</span><br/>
                                <span className="academicYear">{this.state.class.year} {this.state.class.semester}</span><br/>
                            </div>
                        </div>
                        <div className="featuredItem">
                            <h4 className="featuredTitle">Class Size</h4>
                            <div className="featuredInfo">
                                <span className="numberOfStudents">{this.state.class.size}  {this.state.class.size >= 0 ? <span>Students</span> : null}</span>
                            </div>
                        </div>
                        <div className="featuredItem">
                            <h4 className="featuredTitle">Avg Class Attendance</h4>
                            <div className="featuredInfo">
                                <span className="classAverage">{this.state.class.rate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="allGraphs">
                        <div className="graph">
                            <h4 className="graphTitle">Class Performance Analysis</h4>
                            <button className="pass" onClick= {() => this.handlePass()}>Predicted Pass</button>
                            <button className="fail" onClick= {() => this.handleFail()}>Predicted Fail</button>
                            <ResponsiveContainer width="100%" aspect={2/1}>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={dataPie}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        isAnimationActive={true}
                                    >
    
                                        {dataPie.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="graph">
                            <h4 className="graphTitle">Class Attendance Analysis</h4>
                            <ResponsiveContainer width="100%" aspect={2/1}>
                                <BarChart
                                    width={500}
                                    height={400}
                                    data={this.state.attendance}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="actualAttendanceRate" fill="#77DD77" />
                                    <Bar dataKey="predictedAttendanceRate" fill="#78C7C7" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )
        }     
    }
}

export default FeaturesDashboard;