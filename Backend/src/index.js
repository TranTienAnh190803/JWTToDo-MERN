import "dotenv/config";
import express from "express";
import { connectDB } from "./Config/ConnectDB.js";
import userRoute from "./Routes/UserRoute.js";
import { jwtAuthentication } from "./Middlewares/JWTAuthentication.js";
import todoRoute from "./Routes/ToDoRoute.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(jwtAuthentication);

// Routes
app.use("/user", userRoute);
app.use("/todo", todoRoute);

app.get("/", (req, res) => {
    return res.send("<h1>Hello world</h1>")
})

app.listen(port, () => {
    connectDB();
    console.log(`http://localhost:${port}`);
})