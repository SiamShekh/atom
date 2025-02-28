import mongoose from "mongoose";
import { app } from "./app";

async function main() {
    await mongoose.connect('mongodb://localhost:27017/atom');

    app.listen(3000, ()=>{
        console.log(`APP IS RUNING!`);
    })
}

main();