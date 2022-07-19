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
        return http.get(`/surveylist`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
    getSurvey(surveyId) {
        return http.get(`/survey/${surveyId}`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
    deleteSurvey(surveyId) {
        return http.delete(`/user/survey/${surveyId}`, {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        });
      }
}
export default new SurveyService();