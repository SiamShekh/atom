import { model, Schema } from "mongoose"

export interface setting {
    referCommission: number
    premiumUserInviteBonus: number
    genarelUserInviteBonus: number
    newAccountBonus: number
    adsReward: number
    adsLimit: number
}

const schema = new Schema<setting>({
    genarelUserInviteBonus:{
        type: Number,
        required: true,
        default: 1000
    },
    premiumUserInviteBonus:{
        type: Number,
        required: true,
        default: 1500
    },
    newAccountBonus:{
        type: Number,
        required: true,
        default: 500
    },
    referCommission:{
        type: Number,
        required: true,
        default: 10
    },
    adsReward:{
        type: Number,
        required: true,
        default: 100
    },
    adsLimit:{
        type: Number,
        required: true,
        default: 10
    },
},{
    timestamps: true
});

export const SettingModel = model("setting", schema);
