import React, { Component } from 'react';
import AdminService from '../../services/AdminService';

class AddOrUpdateModule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,

            code: "",
            name: "",
            minAttendance: "",
            codeError: "",
            nameError: "",
            minAttendanceError: "",
            modules: []
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.saveModule = this.saveModule.bind(this);
        this.cancel = this.cancel.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }

    componentDidMount() {

        AdminService.getModules().then(
            response => {
                this.setState({modules: response.data})               
            }
        )

        if(this.state.id === -1) {
            return;
        }
        else {
            AdminService.getModuleById(this.state.id).then(
                response => {
                    let module = response.data;
                    this.setState({
                        code: module.code,
                        name: module.name,
                        minAttendance: module.minAttendance
                    })
                }
            );
        }
    }

    handleChange(event) {
        let {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    formValidation() {
        let {code, name, minAttendance} = this.state;
        let isValid = true;

        if(code.trim().length == 0) {
            isValid = false;
            this.setState({codeError: "Please fill in the module code"});
        } else {
            this.setState({codeError: ""});
        }

        if(name.trim().length == 0) {
            isValid = false;
            this.setState({nameError: "Please fill in the module name"});
        } else {
            this.setState({nameError: ""});
        }

        if(minAttendance.length == 0) {
            isValid = false;
            this.setState({minAttendanceError: "Please fill in the minimum attendance for the module"});
        }
        else if(minAttendance < 50 || minAttendance > 100) {
            isValid = false;
            this.setState({minAttendanceError: "Please fill in value between 50 to 100"});
        }
        else {
            this.setState({minAttendanceError: ""});
        }

        if(this.state.id == -1) {
            this.state.modules.map(module => {
                if(this.state.code === module.code) {
                    isValid = false;
                    this.setState({codeError: "Module code exist in system"});
                } 
    
                if(this.state.name === module.name) {
                    isValid = false;
                    this.setState({nameError: "Module name exist in system"});
                } 
            })
        }

        return isValid;
    }

    saveModule(event) {
        event.preventDefault();

        const isValid = this.formValidation();
        console.log(isValid);
        console.log(this.state.codeError);
        console.log(this.state.nameError);
        console.log(this.state.minAttendanceError);

        if(isValid) {
            let module = {code: this.state.code, name: this.state.name, minAttendance: this.state.minAttendance};
        
            if(this.state.id == -1) {
                AdminService.addModule(module).then(
                    reponse => this.props.history.push('/admin/module')
                )
            }
            else {
                AdminService.updateModule(this.state.id, module).then(
                    reponse => this.props.history.push('/admin/module')
                )
            }
        }
    }

    cancel() {
        this.props.history.push('/admin/module')
    }

    render() {
        return (
             <div>
               <div classNAme ="container">
                   <div className="row">
                        <div className= "card col-md-6 offset-md-3 offset-md-3" style={{marginTop:"50px"}}>
                            <h3 className="text-center">{this.state.id == -1 ? "Module Form" : "Edit Module Form"}</h3>
                            <div className= "card-body">
                                <form onSubmit={this.saveModule}>
                                    <div className= "form-group">
                                        <label>Module Code:</label>
                                        <input className= "form-control" type="text" name="code"
                                        value={this.state.code} onChange={this.handleChange}/>
                                    </div>
                                    <div style={{fontSize: 10, color: "red"}}>{this.state.codeError}</div>
                                    <div className= "form-group">
                                        <label>Module Name:</label>
                                        <input className= "form-control" type="text" name="name"
                                        value={this.state.name} onChange={this.handleChange}/>
                                    </div>
                                    <div style={{fontSize: 10, color: "red"}}>{this.state.nameError}</div>
                                    <div className= "form-group">
                                        <label>Minimum Attendance (in %):</label>
                                        <input className= "form-control" type="number" name="minAttendance" 
                                        value={this.state.minAttendance} onChange={this.handleChange}/>
                                    </div>
                                    <div style={{fontSize: 10, color: "red"}}>{this.state.minAttendanceError}</div>
                                    <div style={{marginTop: '5px'}}>
                                        <button className="btn btn-success">{this.state.id == -1 ? "Save" : "Update"}</button>
                                        <button className="btn btn-danger" onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default AddOrUpdateModule;