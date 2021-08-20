import axios from 'axios'

const LECTURER_REST_API_URL = "http://localhost:8080/api/lecturer"

class LecturerServices{
    

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

export default new LecturerServices();