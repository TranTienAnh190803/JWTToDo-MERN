import axios from "../Config/AxiosClient.js";

class ToDoService {
    static async addWork(work) {
        return await axios.post("/todo/add-work", work);
    }

    static async getWork() {
        return await axios.get("/todo/get-work");
    }

    static async editWork(workId, editedWork) {
        return await axios.patch(`/todo/edit-work/${workId}`, editedWork);
    }

    static async deleteWork(workId) {
        return await axios.delete(`/todo/delete-work/${workId}`);
    }

    static async verifyWork(workId) {
        return await axios.patch(`/todo/verify-work/${workId}`, null);
    }

    // Convert
    static getDate(d) {
        const date = new Date(d);
        
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");

        return `${dd}/${MM}/${yyyy}`;
    }

    static getTime(d) {
        const date = new Date(d);

        const hh = String(date.getHours()).padStart(2, "0");
        const mm = String(date.getMinutes()).padStart(2, "0");
        const ss = String(date.getSeconds()).padStart(2, "0");

        return `${hh}:${mm}:${ss}`;
    }
}

export default ToDoService;