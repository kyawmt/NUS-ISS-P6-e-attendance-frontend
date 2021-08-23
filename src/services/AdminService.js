import axios from "axios";
import axiosInstance from "./axiosInstance";

const Lecturer_REST_API_URL = 'http://localhost:8080/api/admin/lecturers';
const Student_REST_API_URL = 'http://localhost:8080/api/admin/students';
const Module_REST_API_URL = 'http://localhost:8080/api/admin/modules';
const ModuleClasses_REST_API_URL = 'http://localhost:8080/api/admin/module-classes';
const ClassStudents_REST_API_URL = 'http://localhost:8080/api/admin/module-classes-students';
const ModuleClassInfo_REST_API_URL = 'http://localhost:8080/api/admin/module-classes-info';
const Class_REST_API_URL = 'http://localhost:8080/api/admin/classes';
const ClassSchedule_REST_API_URL = "http://localhost:8080/api/admin/schedules";

class AdminService {
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
}

export default new AdminService();
