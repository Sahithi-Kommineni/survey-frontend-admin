import http from "../http-common";

class SurveyService {
    createSurvey(surveyData) {
        return http.post(`/user/createsurvey`, surveyData, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
    getAllSurveys() {
        return http.get(`/admin/allusers`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
}
export default new SurveyService();