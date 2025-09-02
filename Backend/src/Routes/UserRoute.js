import express from "express";
import { deleteUser, getAllUser, getLoggedinUser, login, registration } from "../Controllers/UserController.js";
import { jwtAuthorization } from "../Middlewares/JWTAuthorization.js";

const route = express.Router();

route.post("/register", registration);
route.post("/login", login);
route.get("/get-loggedin-user", getLoggedinUser);
route.get("/get-all-user", jwtAuthorization("ADMIN"), getAllUser);
route.delete("/delete/:userId", jwtAuthorization("ADMIN"), deleteUser);

export default route;