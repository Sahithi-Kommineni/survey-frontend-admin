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
}
export default new UserService();