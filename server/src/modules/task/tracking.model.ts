import { model, Schema, Types } from "mongoose"

export interface tracking {
    userId: Types.ObjectId,
    taskId: Types.ObjectId
    point: number
}

const schema = new Schema<tracking>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    taskId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "tasks"
    },
    point: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

export const TaskTrackingModel = model("tracking", schema);