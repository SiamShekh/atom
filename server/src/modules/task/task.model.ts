import { model, Schema } from "mongoose"

export interface task {
    title: string
    href: string
    type: "telegram"|"x"|"visit"|"youtube"|"discord"
    reward: number
    isPublish: boolean
    isDelete: boolean
}

const schema = new Schema<task>({
    title:{
        type: String,
        required: true
    },
    href:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ["telegram","x","visit","youtube","discord"],
        default: "telegram"
    },
    reward:{
        type: Number,
        required: true,
        default: 10
    },
    isDelete:{
        type: Boolean,
        required: true,
        default: false
    },
    isPublish:{
        type: Boolean,
        required: true,
        default: true
    },
},{
    timestamps: true
});

export const TaskModel = model("tasks", schema);
