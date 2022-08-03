import http from "../http-common";

class SurveyService {
    createSurvey(surveyData) {
        return http.post(`/user/createsurvey`, surveyData, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
    updateSurvey(surveyData, surveyId) {
        return http.put(`/user/survey/edit?surveyId=${surveyId}`, surveyData, {
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
                'Authorization': localStorage.getItem('token')
            }
        });
    }
    updateSurveyStatus(surveyData) {
        return http.put(`/survey/${surveyData.id}/${surveyData.isPublished ? 'publish' : 'unpublish'}`, {}, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
    }
    shareLink(linkData) {
        return http.post(`/survey/sharelink`, linkData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
    }
    getSurveyReport(surveyId) {
        return http.get(`/survey/download/pdf/${surveyId}`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
}
export default new SurveyService();
