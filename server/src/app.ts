import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/MainRoutes";
import not_found from "./utils/not_found";
import global_error_handler from "./utils/global_error_handler";

export const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get('/', async (req, res) => {
    res.send({
        msg: "Server is working..."
    })
});

app.use("/api/v1", router);

app.use(global_error_handler)

app.use(not_found);