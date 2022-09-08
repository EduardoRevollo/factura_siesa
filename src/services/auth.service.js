import axios from "axios";

const API_URL = "https://integracioneseco.co/ApiFacturas/api/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login/authenticate", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
