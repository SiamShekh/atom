import { model, Schema, Types } from "mongoose"

export interface user {
    name: string
    uid: number
    username?: string
    balance: number
    referCount: number
    referCode: string
    referBy?: string
    spinCredit: number
    adsWatched: number,
    lastSeen: Date
}

const schema = new Schema<user>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    uid: {
        type: Number,
        required: true,
        unique: true,
        indexes: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    referCode: {
        type: String,
        required: true
    },
    referBy: {
        type: String,
        required: false
    },
    spinCredit: {
        type: Number,
        required: true,
        default: 0
    },
    adsWatched: {
        type: Number,
        required: true,
        default: 0
    },
    referCount: {
        type: Number,
        required: true,
        default: 0
    },
    lastSeen: {
        type: Date,
        required: true,
        default: 1740823892
    }
}, {
    timestamps: true
});

export const UserModel = model("users", schema);
