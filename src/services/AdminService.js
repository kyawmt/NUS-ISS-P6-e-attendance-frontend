import axiosInstance from "./axiosInstance";

const Lecturer_REST_API_URL = 'http://localhost:8080/api/admin/lecturers';
const Student_REST_API_URL = 'http://localhost:8080/api/admin/students';
const Module_REST_API_URL = 'http://localhost:8080/api/admin/modules';
const ModuleClasses_REST_API_URL = 'http://localhost:8080/api/admin/module-classes';
const ClassStudents_REST_API_URL = 'http://localhost:8080/api/admin/module-classes-students';
const ModuleClassInfo_REST_API_URL = 'http://localhost:8080/api/admin/module-classes-info';
const Class_REST_API_URL = 'http://localhost:8080/api/admin/classes';
const ClassSchedule_REST_API_URL = "http://localhost:8080/api/admin/schedules";
const AcademicPeriod_REST_API_URL = "http://localhost:8080/api/admin/academicPeriod";

class AdminService {

    getStudents(){
        return axiosInstance.get(Student_REST_API_URL);
    }

    addStudent(student){
        return axiosInstance.post(Student_REST_API_URL,student)
    }

    getStudentById(id){
        return axiosInstance.get(Student_REST_API_URL+'/'+id);
    }

    updateStudent(student,id){
        return axiosInstance.put(Student_REST_API_URL+'/'+id,student);
    }

    deleteStudent(id){
        return axiosInstance.delete(Student_REST_API_URL+'/'+id);
    }

    isStudentExist(id, userName) {
        return axiosInstance.get(Student_REST_API_URL + '/check-exist' + id, { params: { userName }});
    }

    getLecturers() {
        return axiosInstance.get(Lecturer_REST_API_URL);
    }

    addLecturer(lecturer) {
        return axiosInstance.post(Lecturer_REST_API_URL, lecturer)
    }

    getLecturerById(lecturerId) {
        return axiosInstance.get(Lecturer_REST_API_URL + '/' + lecturerId);
    }

    updateLecturer(lecturer, lecturerId) {
        return axiosInstance.put(Lecturer_REST_API_URL + '/' + lecturerId, lecturer);
    }

    deleteLecturer(lecturerId) {
        return axiosInstance.delete(Lecturer_REST_API_URL + '/' + lecturerId);
    }

    isLecturerExist(id, userName) {
        return axiosInstance.get(Lecturer_REST_API_URL + '/check-exist/' + id, { params: { userName }});
    }

    getModules() {
        return axiosInstance.get(Module_REST_API_URL);
    }

    getModuleById(moduleId) {
        return axiosInstance.get(Module_REST_API_URL + "/" + moduleId);
    }

    addModule(module) {
        return axiosInstance.post(Module_REST_API_URL, module);
    }

    updateModule(moduleId, module) {
        return axiosInstance.put(Module_REST_API_URL + "/" + moduleId, module);
    }

    deleteModule(moduleId) {
        return axiosInstance.delete(Module_REST_API_URL + "/" + moduleId);
    }

    getClassByModuleId(moduleId) {
        return axiosInstance.get(ModuleClasses_REST_API_URL + '/' + moduleId);
    }

    getStudentsByClassId(classId) {
        return axiosInstance.get(ClassStudents_REST_API_URL + '/' + classId);
    }

    getClassInfoByClassId(classId) {
        return axiosInstance.get(ModuleClassInfo_REST_API_URL + '/' + classId);
    }

    getSchedules() {
        return axiosInstance.get(ClassSchedule_REST_API_URL);
    }

    deleteSchedule(scheduleId) {
        return axiosInstance.delete(ClassSchedule_REST_API_URL + "/" + scheduleId);
    }

    addSchedule(schedule) {
        return axiosInstance.post(ClassSchedule_REST_API_URL, schedule);
    }

    getAcademicPeriods() {
        return axiosInstance.get(AcademicPeriod_REST_API_URL);
    }

    getClasses() {
        return axiosInstance.get(Class_REST_API_URL);
    }

    deleteClass(classId) {
        return axiosInstance.delete(Class_REST_API_URL + "/" + classId);
    }

    addSchedules(schedule) {
        return axiosInstance.post(ClassSchedule_REST_API_URL, schedule);
    }

    getModuleValidation(toCheck, moduleValidation){
        return axiosInstance.get(Module_REST_API_URL+'/validation/'+toCheck+'/'+moduleValidation);
    }
}

export default new AdminService();
