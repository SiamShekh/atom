import catchAsync from "../../utils/catch_async";
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

    const isUniuqe = await UserModel.findOne({referCode});
    if (isUniuqe?.name) {
        throw new Error("unique refer code required");
    }

    user.referCode = referCode;
    await user.save({});

    res.send(user);
});

const user = {
    my_user,
    referlist,
    update_refer_code
}

export default user;