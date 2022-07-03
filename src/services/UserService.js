import http from "../http-common";
const token = localStorage.getItem('token');
class UserService {
    createUser(userData) {
        return http.post(`/admin/create/user`, userData, {
            headers: {
                "Authorization": token
            }
        });
    }
    getAllUsers() {
        return http.get(`/admin/allusers`, {
            headers: {
                "Authorization": token
            }
        });
    }
}
export default new UserService();