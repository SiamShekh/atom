import { Types } from "mongoose";
import catchAsync from "../../utils/catch_async";
import { AdsModel } from "../ads/ads.model";
import { SpinModel } from "../spin/spin.model";
import { TaskTrackingModel } from "../task/tracking.model";
import { UserModel } from "./user.model";

const my_user = catchAsync(async (req, res) => {
    const user = await UserModel.findById(req?.user?._id);
    if (!user) {
        throw new Error("collection not found");
    }
    res.send(user);
});

const referlist = catchAsync(async (req, res) => {
    const user = await UserModel.findById(req?.user?._id);
    if (!user) {
        throw new Error("collection not found");
    }
    const refer = await UserModel.find({
        referBy: user?.referCode
    }).limit(3);

    const refer_count = await UserModel.countDocuments({
        referBy: user?.referCode
    });

    res.send({ refer, count: refer_count });
});

const update_refer_code = catchAsync(async (req, res) => {
    const { referCode } = req.body;
    if (!referCode) {
        console.log('refer code is required');
    }

    const user = await UserModel.findById(req?.user?._id);
    if (!user) {
        throw new Error("collection not found");
    }

    const isRefer = await UserModel.findOne({ referBy: user?.referCode });
    if (isRefer?.name) {
        throw new Error("refer code is not change able for you");
    }

    const isUniuqe = await UserModel.findOne({ referCode });
    if (isUniuqe?.name) {
        throw new Error("unique refer code required");
    }

    user.referCode = referCode;
    await user.save({});

    res.send(user);
});

const history = catchAsync(async (req, res) => {
    const combined = [
        ...(await TaskTrackingModel.find({ userId: req.user._id }).limit(10).sort("-createdAt")),
        ...(await AdsModel.find({ userId: req.user._id }).limit(10).sort("-createdAt")),
        ...(await SpinModel.find({ userId: req.user._id }).limit(10).sort("-createdAt")),
    ];


    const sorted = combined.sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.send(sorted?.slice(0, 10));
});

const claim_tap_point = catchAsync(async (req, res) => {
    if (!req.body?.point) {
        throw new Error("field missing");
    }

    const user = await UserModel.findById(req.user._id);
    if (user) {
        user.balance += req.body.point;
        await user.save({});
    }

    res.send({ status: true });
});

const stats = catchAsync(async (req, res) => {
    const task = await TaskTrackingModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(req?.user?._id)
            }
        },
        {
            $group: {
                _id: "$userId",
                count: { $sum: "$point" }
            }
        }
    ]);

    const ads = await AdsModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(req?.user?._id)
            }
        },
        {
            $group: {
                _id: "$userId",
                count: { $sum: "$reward" }
            }
        }
    ]);

    const spin = await SpinModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(req?.user?._id)
            }
        },
        {
            $group: {
                _id: "$userId",
                count: { $sum: "$reward" }
            }
        }
    ]);

    res.send({ task:task[0], ads:ads[0], spin:spin[0] });
});

const user = {
    my_user,
    referlist,
    update_refer_code,
    history,
    claim_tap_point,
    stats
}

export default user;