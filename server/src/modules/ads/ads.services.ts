import { startSession } from "mongoose";
import catchAsync from "../../utils/catch_async";
import { UserModel } from "../user/user.model";
import { AdsModel } from "./ads.model";
import { SettingModel } from "../setting/setting.model";

const watch_ads = catchAsync(async (req, res) => {
    const session = await startSession();
    session.startTransaction();

    const user = await UserModel.findById(req.user._id).session(session);
    const setting = await SettingModel.findOne({}).session(session);
    const watched_ads = await AdsModel.countDocuments({
        userId: req?.user?._id,
        createdAt: { $gt: new Date().setHours(0, 0, 0, 0) }
    });


    if (!user || !setting) {
        throw new Error("query request are rejected");
    }

    if (watched_ads >= setting?.adsLimit) {
        throw new Error("today limit is over");
    }

    const result = await AdsModel.create([{
        userId: req.user._id,
        reward: setting?.adsReward
    }], { session });

    if (result[0]._id) {
        user.balance += setting?.adsReward;
        await user.save({ session });
    }

    await session.commitTransaction();
    await session.endSession();

    res.send(result);
});

const ads = {
    watch_ads
}

export default ads;