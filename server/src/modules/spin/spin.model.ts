import { model, Schema, Types } from "mongoose";

interface spin {
    userId: Types.ObjectId
    reward: number
    createdAt: Date
    type: string
}

const schema = new Schema<spin>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    reward: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "spin"
    }
}, {
    timestamps: true
});

export const SpinModel = model("spin", schema);
