import axios from "axios";

const Lecturer_REST_API_URL='http://localhost:8080/api/admin/lecturers';
const Student_REST_API_URL='http://localhost:8080/api/admin/students';
const Module_REST_API_URL='http://localhost:8080/api/admin/modules';
const ModuleClasses_REST_API_URL='http://localhost:8080/api/admin/module-classes';
const ClassStudents_REST_API_URL='http://localhost:8080/api/admin/module-classes-students';
const ModuleClassInfo_REST_API_URL='http://localhost:8080/api/admin/module-classes-info';
const Class_REST_API_URL='http://localhost:8080/api/admin/classes';

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

    getModules() {
        return axios.get(Module_REST_API_URL);
    }

    getModuleById(moduleId) {
        return axios.get(Module_REST_API_URL + "/" + moduleId);
    }

    addModule(module) {
        return axios.post(Module_REST_API_URL, module);
    }

    updateModule(moduleId, module) {
        return axios.put(Module_REST_API_URL + "/" + moduleId, module);
    }

    deleteModule(moduleId) {
        return axios.delete(Module_REST_API_URL + "/" + moduleId);
    }

    getClassByModuleId(moduleId){
        return axios.get(ModuleClasses_REST_API_URL+'/'+moduleId);
    }

    getStudentsByClassId(classId){
        return axios.get(ClassStudents_REST_API_URL+'/'+classId);
    }

    getClassInfoByClassId(classId){
        return axios.get(ModuleClassInfo_REST_API_URL+'/'+classId);
    }
}

export default new AdminService();
