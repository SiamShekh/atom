import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/MainRoutes";

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({
        status: false,
        msg: err.message
    })
})
