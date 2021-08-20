import axios from "axios";

const Lecturer_Schedules_REST_API_URL='http://localhost:8080/api/lecturer/schedules';

class LecturerService{

    getSchedules() {
        return axios.get(Lecturer_Schedules_REST_API_URL);
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

}

export default new LecturerService();