import express from "express";
import cors from "cors";
import { UserModel } from "./modules/user/user.model";

export const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get('/', async (req, res) => {
    res.send({
        msg: "Server is working..."
    })
})

export interface Root {
    id: number
    first_name: string
    last_name: string
    username: string
    language_code: string
    allows_write_to_pm: boolean
    photo_url: string
  }
  
app.post('/user', async (req, res) => {
    console.log(req.body);
    const userBody: Root = req.body.user;
    const ress = await UserModel.create({
        name: userBody.first_name + " "+ userBody.last_name,
        uid: userBody.id,
        username: userBody.username,
        referCode: 'siam'
    })
    res.send({msg: "success", data: ress})
})