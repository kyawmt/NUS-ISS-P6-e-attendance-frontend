import React, { Component } from 'react';
import AdminService from '../../services/AdminService';

class AddOrUpdateLecturer extends Component {
    
    constructor(props){
        super(props)

        this.state={
            // update: step 2
            id: this.props.match.params.id,

            firstName:'',
            lastName:'', 
            userName:'',
            firstNameError: "",
            lastNameError: "",
            userNameError: "",
            isUserNameExist: false
        }

        this.changeFirstNameHandlers=this.changeFirstNameHandlers.bind(this);
        this.changeLastNameHandlers=this.changeLastNameHandlers.bind(this);
        this.changeUserNameHandlers=this.changeUserNameHandlers.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.saveLecturer=this.saveLecturer.bind(this)
    }

    // update: step 3
    componentDidMount(){

        // update: step 4
        if(this.state.id==-1){
            return 
        }else{
            AdminService.getLecturerById(this.state.id).then((res)=>{
                let lecturer=res.data;
                this.setState({
                    firstName:lecturer.firstName,
                    lastName:lecturer.lastName, 
                    userName:lecturer.userName, 
                });
            });
        }
    }   

    formValidation() {

        let {firstName, lastName, userName, isUserNameExist} = this.state;
        let isValid = true;

        if(firstName.trim().length == 0) {
            isValid = false;
            this.setState({firstNameError: "Please fill in the first name"});
        } else {
            this.setState({firstNameError: ""});
        }

        if(lastName.trim().length == 0) {
            isValid = false;
            this.setState({lastNameError: "Please fill in the last name"});
        } else {
            this.setState({lastNameError: ""});
        }

        if(userName.trim().length == 0) {
            isValid = false;
            this.setState({userNameError: "Please fill in the user name"});
        }
        else if(!userName.includes("@")) {
            isValid = false;
            this.setState({userNameError: "Please use email as user name"});
        }
        else if(isUserNameExist){
            isValid = false;
            this.setState({userNameError: "User name exist in system"});
        }
        else {
            this.setState({userNameError: ""});
        }

        return isValid;
    }

    saveLecturer=(e)=>{
        e.preventDefault();

        const isValid = this.formValidation();

        if (isValid){
            let lecturer={
                firstName:this.state.firstName,
                lastName:this.state.lastName, 
                userName:this.state.userName
            };
            console.log('lecturer=> '+JSON.stringify(lecturer));
            // console.log('id => ' + JSON.stringify(this.state.id));
    
            // update: step 5
            if(this.state.id==-1){
                AdminService.addLecturer(lecturer).then(res=>{
                    this.props.history.push('/admin/lecturers');
                }); 
            }else{
                AdminService.updateLecturer(lecturer,this.state.id).then(res =>{
                    this.props.history.push('/admin/lecturers');
                });
            }
        }
    }

    changeFirstNameHandlers=(event)=>{
        this.setState({firstName:event.target.value});
    }
    changeLastNameHandlers=(event)=>{
        this.setState({lastName:event.target.value});
    }
    changeUserNameHandlers=(event)=>{
        this.setState({userName:event.target.value});
        AdminService.isLecturerExist(this.state.id, event.target.value).then(
            res => this.setState({isUserNameExist: res.data})
            ); 
    }

    cancel(){
        this.props.history.push('/admin/lecturers');
    }

    // update: step 6
    getTitle(){
        if(this.state.id==-1){
            return <h3 className="text-center" style={{marginTop:"10px"}}>Add Lecturer Form</h3>;
        }else{
            return <h3 className="text-center" style={{marginTop:"10px"}}>Update Lecturer Form</h3>;
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3" style={{marginTop:"50px"}}>
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name: </label>
                                        <input placeholder="Enter First Name" name="firstName" className="form-control" 
                                        value={this.state.firstName} onChange={this.changeFirstNameHandlers}
                                        style= {{ border: this.state.firstNameError !== "" ? '0.5px solid red' : ''}}/>
                                    </div>
                                    <div style={{fontSize: 10, color: "red"}}>{this.state.firstNameError}</div>
                                    <div className="form-group" style={{marginTop:"10px"}}>
                                        <label>Last Name: </label>
                                        <input placeholder="Enter Last Name" name="lastName" className="form-control" 
                                        value={this.state.lastName} onChange={this.changeLastNameHandlers}
                                        style= {{ border: this.state.lastNameError !== "" ? '0.5px solid red' : ''}}/>
                                    </div>
                                    <div style={{fontSize: 10, color: "red"}}>{this.state.lastNameError}</div>
                                    <div className="form-group" style={{marginTop:"10px"}}>
                                        <label>User Name: </label>
                                        <input placeholder="Enter User Name" name="userName" className="form-control" 
                                        value={this.state.userName} onChange={this.changeUserNameHandlers}
                                        style= {{ border: this.state.userNameError !== "" ? '0.5px solid red' : ''}}/>
                                    </div>
                                    <div style={{fontSize: 10, color: "red"}}>{this.state.userNameError}</div>
                                    <div style={{marginTop:"10px"}}>
                                        <button className="btn btn-success" onClick={this.saveLecturer}>{this.state.id == -1 ? "Save" : "Update"}</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
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

export default AddOrUpdateLecturer;