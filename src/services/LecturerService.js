import axios from "axios";

const Lecturer_Schedules_REST_API_URL='http://localhost:8080/api/lecturer/schedules';
const Class_REST_API_URL='http://localhost:8080/api/lecturer';
const LECTURER_REST_API_URL = 'http://localhost:8080/api/lecturer';

class LecturerService{

    getSchedules() {
        return axios.get(Lecturer_Schedules_REST_API_URL);
    }

    getLecturerTodaySchedule(){
        return axios.get(Lecturer_Schedules_REST_API_URL+'/'+'todaySchedule');
    }

    getSchedulesByRange(startDateinMs, endDateinMs){
        console.log(startDateinMs);
        return axios.get(Lecturer_Schedules_REST_API_URL+'/'+ 'schedulesByRange/'+ startDateinMs + '/' + endDateinMs);
    }

    getSchedulebyId(scheduleId){
        return axios.get(Lecturer_Schedules_REST_API_URL+'/'+scheduleId);
    }

    getQRCodeData(scheduleId, option){
        return axios.get(Lecturer_Schedules_REST_API_URL+'/qrcode/'+scheduleId+'/'+option);
    }

    getScheduleAttendance(scheduleId, option){
        return axios.get(Lecturer_Schedules_REST_API_URL+'/attendance/'+scheduleId+'/'+option);
    }

    getClassById(lecturerId){
        return axios.get(Class_REST_API_URL+'/classes/'+lecturerId);
    }

    getClassByClassId(classId){
        return axios.get(Class_REST_API_URL+'/class/'+classId);
    }

    getAttendanceByClassId(classId){
        return axios.get(Class_REST_API_URL+'/classDates/'+classId);
    }

    getPresentStudentBySelecting(id){
        return axios.get(LECTURER_REST_API_URL+'/class/schedules/attendance/present/'+id)
    }
    getAbsentStudentBySelecting(id){
        return axios.get(LECTURER_REST_API_URL+'/class/schedules/attendance/absent/'+id)
    }
    getOverviewFromSelection(id){
        return axios.get(LECTURER_REST_API_URL+'/class/schedules/attendance/overview/'+id)
    }

    getListofSchedule(){
        return axios.get(LECTURER_REST_API_URL+'/class/schedules')
    }
}

export default new LecturerService();
