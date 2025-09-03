import { jwtDecode } from "jwt-decode";
import axios from "../Config/AxiosClient.js";

class UserService {
    static async register(registrationForm) {
        return await axios.post("/user/register", registrationForm);
    }

    static async login(loginForm) {
        return await axios.post("/user/login", loginForm);
    }

    static async getLoggedinUser() {
        return await axios.get("/user/get-loggedin-user");
    }

    static async getAllUser() {
        return await axios.get("/user/get-all-user");
    }

    static async deleteUser(userId) {
        return await axios.delete(`/user/delete/${userId}`);
    }

    // Check
    static isAuthenticate() {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    static isUser() {
        try {
            const token = localStorage.getItem("token")
            const {role} = jwtDecode(token);
            return role === "USER" && this.isAuthenticate();
        } catch (error) {
            return false
        }
    }

    static isAdmin() {
        try {
            const token = localStorage.getItem("token");
            const {role} = jwtDecode(token);
            return role === "ADMIN" && this.isAuthenticate();
        } catch (error) {
            return false;
        }
    }

    static isTokenValid() {
        try {
            const token = localStorage.getItem("token");
            const payload = jwtDecode(token);
            const exp = payload.exp * 1000;
            if (Date.now() > exp) {
                alert("Token has expired");
                return true;
            }
            return false;
        } catch (error) {
            const token = localStorage.getItem("token");
            if (token) {
                alert(error.message);
                return true;
            }
            return false;
        }
    }

    static logout() {
        localStorage.removeItem("token");
    }
}

export default UserService;