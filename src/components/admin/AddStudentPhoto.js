import React, { Component } from 'react';
import AdminService from '../../services/AdminService';
import axiosInstance from '../../services/axiosInstance';

class AddStudentPhoto extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            userName: "",
            photo: null,
            photoError: "",
        }

        this.registerStudentPhoto = this.registerStudentPhoto.bind(this);
        this.cancel = this.cancel.bind(this);
        this.photo = React.createRef();
    }

    componentDidMount() {
        AdminService.getStudentById(this.state.id).then(
            response => {
                let student = response.data;
                this.setState({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    userName: student.userName,
                })
            }
        );
    }

    handlePhotoChange = async (event) => {
        event.preventDefault();

        let reader = new FileReader();
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                this.setState({
                    photo: reader.result,
                });
            };
        }
    }

    registerStudentPhoto(event) {
        event.preventDefault();

        if (this.state.photo != null) {
            let data = new FormData();

            data.append("photo", this.state.photo);
            data.append("id", this.state.id);

            axiosInstance({
                method: "POST",
                url: "/api/admin/studentphoto",
                headers: { "Content-Type": "multipart/form-data", },
                data
            }).then((res) => {
                this.setState({ photoError: res.data })
                if (this.state.photoError == "SUCCESS") {
                    setTimeout(
                        window.location.href='/admin/students'
                        , "3000"
                    )
                }
            })
                .catch((err) => console.log(err));
        } else {
            this.setState({ photoError: "no photo found" })
        }
    }

    cancel() {
        this.props.history.push('/admin/students')
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ marginTop: "50px" }}>
                            <h3 className="text-center">{this.state.id == -1 ? "Add Student Form" : "Edit Student Form"}</h3>
                            <div className="card-body">
                                <form onSubmit={this.registerStudentPhoto}>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input className="form-control" type="text" name="firstName" value={this.state.firstName} readOnly={true} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input className="form-control" type="text" name="lastName" value={this.state.lastName} readOnly={true} />
                                    </div>
                                    <div className="form-group">
                                        <label>User Name:</label>
                                        <input className="form-control" type="text" name="userName" value={this.state.userName} readOnly={true} />
                                    </div>
                                    <div className="form-group">
                                        <label>Photo:</label>
                                        <input className="form-control" type="file" name="photo" onChange={this.handlePhotoChange}
                                            style={{ border: this.state.photoError !== "" ? '0.5px solid red' : '' }} />
                                    </div>
                                    <div style={{ fontSize: 10, color: "red" }}>{this.state.photoError}</div>

                                    <div style={{ marginTop: '5px' }}>
                                        <button className="btn btn-success">Register Student Photo</button>
                                        <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Cancel</button>
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

export default AddStudentPhoto;