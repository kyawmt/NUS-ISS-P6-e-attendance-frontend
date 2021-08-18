import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area} from 'recharts';
import './featuresDashboard.css'

class FeaturesDashboard extends Component {
    render() {

        const dataPie = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
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

        const dataBar = [
            {
              name: '16/8',
              actual: 90,
              predicted: 90,
              amt: 2400,
            },
            {
              name: '17/8',
              actual: 80,
              predicted: 92,
              amt: 2210,
            },
            {
              name: '18/8',
              actual: 0,
              predicted: 80,
              amt: 2290,
            },
            {
              name: '19/8',
              actual: 0,
              predicted: 97,
              amt: 2000,
            },
            {
              name: '20/8',
              actual: 0,
              predicted: 90,
              amt: 2181,
            },
          ];

        return (
            <div className="allFeatures">
                <div className="featured">
                    <div className="featuredItem">
                        <h4 className="featuredTitle">Class Information</h4>
                        <div className="featuredInfo">
                            <span className="moduleName">COM1001<br/>Fundamental in Computing</span><br/>
                            <span className="academicYear">Academic year: AY21/22 Sem 2</span><br/>
                            <span className="date">Schedule: Daily, AM</span>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <h4 className="featuredTitle">Class Size</h4>
                        <div className="featuredInfo">
                            <span className="numberOfStudents">52 Students</span>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <h4 className="featuredTitle">Classes Left</h4>
                        <div className="featuredInfo">
                            <span className="classesLeft">8 classes</span>
                        </div>
                    </div>
                </div>
                <div className="allGraphs">
                    <div className="graph">
                        <h4 className="graphTitle">Class Performance Analysis</h4>
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
                                >
                                    <Legend verticalAlign="top" height={36}/>
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
                                data={dataBar}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="actual" fill="#77DD77" />
                                <Bar dataKey="predicted" fill="#78C7C7" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeaturesDashboard;