import express from "express";
import { addWork, deleteWork, editWork, getWorks, verifyWork } from "../Controllers/ToDoController.js";
import { jwtAuthorization } from "../Middlewares/JWTAuthorization.js";

const route = express.Router();

route.post("/add-work", jwtAuthorization("USER"), addWork);
route.get("/get-work", jwtAuthorization("USER"), getWorks);
route.patch("/edit-work/:workId", jwtAuthorization("USER"), editWork);
route.delete("/delete-work/:workId", jwtAuthorization("USER"), deleteWork);
route.patch("/verify-work/:workId", jwtAuthorization("USER"), verifyWork);

export default route;