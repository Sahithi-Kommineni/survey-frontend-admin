import http from "../http-common";

class UserService {
    createUser(userData) {
        return http.post(`/admin/create/user`, userData, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
    getAllUsers() {
        return http.get(`/admin/allusers`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
    getUserData(userId) {
        return http.get(`/admin/${userId}`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
    deleteUser(userId) {
        return http.delete(`/admin/${userId}`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
    }
}
export default new UserService();