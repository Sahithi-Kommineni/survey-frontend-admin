import http from "../http-common";
const token = localStorage.getItem('token');
class AuthService {
  signIn(authData) {
    return http.post(`/auth/signin`, authData);
  }
  signOut(userId) {
    return http.get(`/auth/logout/${userId}`, {
      headers: {
        "Authorization": token
      }
    });
  }
}
export default new AuthService();