import { jwtDecode } from "jwt-decode";
import axios from "../Config/AxiosClient.js";

class UserService {
    static async register(registrationForm) {
        return await axios.post("/user/register", registrationForm);
    }

    static async login(loginForm) {
        return await axios.post("/user/login", loginForm);
    }

    // Check
    static async isAuthenticate(token) {
        try {
            const info = jwtDecode(token);
            if (info)
                return true;
            return false;
        } catch (error) {
            return false;
        }
    }

    static async isUser(token) {
        try {
            const {role} = jwtDecode(token);
            return role === "USER" && this.isAuthenticate(token);
        } catch (error) {
            return false
        }
    }

    static async isAdmin(token) {
        try {
            const {role} = jwtDecode(token);
            return role === "ADMIN" && this.isAuthenticate(token);
        } catch (error) {
            return false;
        }
    }
}

export default UserService;