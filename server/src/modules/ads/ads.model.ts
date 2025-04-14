import { model, Schema, Types } from "mongoose";

interface ads {
    userId: Types.ObjectId
    reward: number
    createdAt: string
}

const schema = new Schema<ads>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    reward: {
        type: Number,
        required: true
    }
},{
    timestamps:true
});

export const AdsModel = model("ads", schema);
