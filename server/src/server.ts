import mongoose from "mongoose";
import { app } from "./app";
import Env from "./environment";
import { SettingModel } from "./modules/setting/setting.model";

async function main() {
    await mongoose.connect(Env.uri);
    await defaultSetting();

    app.listen(3000, () => {
        console.log(`APP IS RUNING!`);
    })
}

main();

async function defaultSetting() {
    const setting = await SettingModel.findOne({});
    if (!setting) {
        await SettingModel.create({});
        console.log(`NEW SETTING CREATED!`);
    } else {
        console.log(`ALREADY HAVE A SETTING!`);
    }
}