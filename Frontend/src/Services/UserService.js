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

    // Check
    static async isAuthenticate() {
        try {
            const token = localStorage.getItem("token")
            const info = jwtDecode(token);
            if (info)
                return true;
            return false;
        } catch (error) {
            return false;
        }
    }

    static async isUser() {
        try {
            const token = localStorage.getItem("token")
            const {role} = jwtDecode(token);
            return role === "USER" && this.isAuthenticate();
        } catch (error) {
            return false
        }
    }

    static async isAdmin() {
        try {
            const token = localStorage.getItem("token")
            const {role} = jwtDecode(token);
            return role === "ADMIN" && this.isAuthenticate();
        } catch (error) {
            return false;
        }
    }
}

export default UserService;