import { FieldValues, useForm } from "react-hook-form";
import { singleTask, updateTask } from "../../api/task.admin";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const UpdateTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();
    const [query, { data, isLoading }] = singleTask();

    useEffect(() => {
        if (id) {
            query(id);
        }
    }, [id, query]);

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset])

    const arr = [
        {
            key: "title",
            placeholder: "Enter the title...",
            label: "title"
        },
        {
            key: "href",
            placeholder: "Enter the link...",
            label: "Link"
        },
        {
            key: "reward",
            placeholder: "Enter the reward...",
            label: "reward"
        },
    ];

    const options = ["telegram", "x", "visit", "youtube", "discord"];
    const [mutation, { status }] = updateTask();

    const createTask = (e: FieldValues) => {
        mutation({
            id: id,
            body: e
        });
    }

    useEffect(() => {
        switch (status) {
            case QueryStatus.pending:
                toast.dismiss();
                toast.loading("Loading");
                break;
            case QueryStatus.fulfilled:
                toast.dismiss();
                toast.success("Successfuly update task.");
                reset();
                break;
            case QueryStatus.rejected:
                toast.dismiss();
                toast.error("Reqest rejected");
                break;

        }
    }, [status, reset])

    return (
        <form onSubmit={handleSubmit(createTask)} className="relative">
            {
                isLoading &&
                <div className="flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg "></span>
                </div>
            }

            {
                arr.map((fields) => (
                    <div className=" mt-3" key={fields.key}>
                        <p className="capitalize mb-1">{fields.label}</p>
                        <input type="text" {...register(fields.key)} placeholder={fields.placeholder} className="outline-0 bg-white/10 p-2 rounded-lg lg:min-w-md w-full capitalize" />
                    </div>
                ))
            }
            <div className="mt-3">
                <p className="capitalize mb-1">select the type</p>
                <select {...register("type")} defaultValue={options[0]} className="outline-0 bg-white/10 p-2 rounded-lg lg:min-w-md w-full capitalize">
                    {
                        options.map((val) => (
                            <option value={val} key={val}>{val}</option>
                        ))
                    }
                </select>
            </div>
            <div className="mt-3">
                <p className="capitalize mb-1">select the type</p>
                <select {...register("isPublish")} className="outline-0 bg-white/10 p-2 rounded-lg lg:min-w-md w-full capitalize">
                    <option value={"false"}>NO</option>
                    <option value={"true"}>YES</option>
                </select>
            </div>
            <button type="submit" className="font-montserrat font-medium lg:min-w-md w-full p-2 bg-white/10 mt-5 rounded-lg">Update Task</button>
        </form>
    );
};

export default UpdateTask;