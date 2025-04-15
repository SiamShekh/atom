import { ClientSession, startSession } from "mongoose";
import catchAsync from "../../utils/catch_async";
import { UserModel } from "../user/user.model";
import abortCall from "../../utils/abort_call";
import { SpinModel } from "./spin.model";

const spin_wheel = catchAsync(async (req, res) => {
    const { rotate, type }: { rotate: number, type: "ads" | "coin" } = req.body;
    const user = await UserModel.findById(req.user._id);
    if (!user) {
        throw new Error("user not found");
    }

    console.log(rotate);
    

    if (type==="coin") {
        user.balance -= 100;
    }

    user.balance += calculate_reward(rotate);
    await user.save();

    await SpinModel.create([{
        userId: user?._id,
        reward: calculate_reward(rotate)
    }])

    res.send(user);
});


const spin = {
    spin_wheel
};

export default spin;

function calculate_reward(rawRotate: number) {
    let rotate;
    if (rawRotate < 700) {
        rotate = 2000;
    } else if (rawRotate < 800) {
        rotate = 500;
    } else if (rawRotate < 900) {
        rotate = 1000;
    } else {
        rotate = 1500;
    }
    return rotate;
}
