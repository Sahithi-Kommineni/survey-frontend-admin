import http from "../http-common";
class AuthService {
  signIn(authData) {
    return http.post(`/auth/signin`, authData);
  }
  signOut(userId) {
    return http.get(`/auth/logout/${userId}`, {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    });
  }
}
export default new AuthService();