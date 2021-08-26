import axios from "axios";
import axiosInstance from "./axiosInstance";

const Lecturer_Schedules_REST_API_URL='http://localhost:8080/api/lecturer/schedules';
const Class_REST_API_URL='http://localhost:8080/api/lecturer';
const LECTURER_REST_API_URL = 'http://localhost:8080/api/lecturer';

class LecturerService{

    getSchedules() {
        return axiosInstance.get(Lecturer_Schedules_REST_API_URL);
    }

    getLecturerTodaySchedule(){
        return axiosInstance.get(Lecturer_Schedules_REST_API_URL+'/todaySchedule');
    }

    getSchedulesByRange(startDateinMs, endDateinMs){
        
        return axiosInstance.get(Lecturer_Schedules_REST_API_URL+'/schedulesByRange/'+ startDateinMs + '/' + endDateinMs);
    }

    getSchedulebyId(scheduleId){
        return axiosInstance.get(Lecturer_Schedules_REST_API_URL+'/'+scheduleId);
    }

    getQRCodeData(scheduleId, option){
        return axiosInstance.get(Lecturer_Schedules_REST_API_URL+'/qrcode/'+scheduleId+'/'+option);
    }

    getScheduleAttendance(scheduleId, option){
        return axiosInstance.get(Lecturer_Schedules_REST_API_URL+'/attendance/'+scheduleId+'/'+option);
    }

    getClassById(){
        return axiosInstance.get(Class_REST_API_URL+'/classes');
    }

    getClassByClassId(classId){
        return axiosInstance.get(Class_REST_API_URL+'/class/'+classId);
    }

    getAttendanceByClassId(classId){
        return axiosInstance.get(Class_REST_API_URL+'/classDates/'+classId);
    }

    getPresentStudentBySelecting(id){
        return axiosInstance.get(LECTURER_REST_API_URL+'/class/schedules/attendance/present/'+id)
    }
    getAbsentStudentBySelecting(id){
        return axiosInstance.get(LECTURER_REST_API_URL+'/class/schedules/attendance/absent/'+id)
    }
    getOverviewFromSelection(id){
        return axiosInstance.get(LECTURER_REST_API_URL+'/class/schedules/attendance/overview/'+id)
    }

    getListofSchedule(){
        return axiosInstance.get(LECTURER_REST_API_URL+'/class/schedules')
    }

    getNameandDate(id){
        return axiosInstance.get(LECTURER_REST_API_URL+'/schedule/name/'+id)
    }

    getmaxID(){
        return axiosInstance.get(LECTURER_REST_API_URL+'/maxschedule')
    }

    getStudents(classId, index){
        return axiosInstance.get(Class_REST_API_URL+'/prediction/'+classId+'/'+index);
    }
}

export default new LecturerService();
