import mongoose from "mongoose";
import { app } from "./app";
import Env from "./environment";

async function main() {
    await mongoose.connect(Env.uri);

    app.listen(3000, ()=>{
        console.log(`APP IS RUNING!`);
    })
}

main();