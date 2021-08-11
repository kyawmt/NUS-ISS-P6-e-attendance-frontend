import axios from "axios";

const Lecturer_REST_API_URL='http://localhost:8080/admin/lecturers';
const Student_REST_API_URL='http://localhost:8080/api/students';
const Module_REST_API_URL='http://localhost:8080/api/modules';
const Class_REST_API_URL='http://localhost:8080/api/classes';

class AdminService{
    getLecturers(){
        return axios.get(Lecturer_REST_API_URL);
    }

    addLecturer(lecturer){
        return axios.post(Lecturer_REST_API_URL,lecturer)
    }

    getLecturerById(lecturerId){
        return axios.get(Lecturer_REST_API_URL+'/'+lecturerId);
    }

    updateLecturer(lecturer,lecturerId){
        return axios.put(Lecturer_REST_API_URL+'/'+lecturerId,lecturer);
    }

    deleteLecturer(lecturerId){
        return axios.delete(Lecturer_REST_API_URL+'/'+lecturerId);
    }
}

export default new AdminService();
