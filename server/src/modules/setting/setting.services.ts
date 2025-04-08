import catchAsync from "../../utils/catch_async";
import { SettingModel } from "./setting.model";

const getTask = catchAsync(async (req, res) => {
    const setting = await SettingModel.findOne({});
    res.send(setting);
})

const setting = {
    getTask
}

export default setting;