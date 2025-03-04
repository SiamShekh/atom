import { FieldValues, useForm } from "react-hook-form";
import { createTaskAdmin } from "../../api/task";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const AddNewTask = () => {
    const { register, handleSubmit, reset } = useForm();

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
    const [mutation, { status }] = createTaskAdmin();

    const createTask = (e: FieldValues) => {
        console.log(e);
        mutation(e);
    }

    useEffect(() => {
        switch (status) {
            case QueryStatus.pending:
                toast.dismiss();
                toast.loading("Loading");
                break;
            case QueryStatus.fulfilled:
                toast.dismiss();
                toast.success("Successfuly created new task.");
                reset();
                break;
            case QueryStatus.rejected:
                toast.dismiss();
                toast.error("Reqest rejected");
                break;

        }
    }, [status, reset])

    return (
        <form onSubmit={handleSubmit(createTask)}>
            {
                arr.map((fields) => (
                    <div className=" mt-3" key={fields.key}>
                        <p className="capitalize mb-1">{fields.label}</p>
                        <input type="text" {...register(fields.key)} placeholder={fields.placeholder} className="outline-0 bg-white/10 p-2 rounded-lg min-w-md capitalize" />
                    </div>
                ))
            }
            <div className="mt-3">
                <p className="capitalize mb-1">select the type</p>
                <select {...register("type")} defaultValue={options[0]} className="outline-0 bg-white/10 p-2 rounded-lg min-w-md capitalize">
                    {
                        options.map((val) => (
                            <option value={val} key={val}>{val}</option>
                        ))
                    }
                </select>
            </div>
            <button type="submit" className="font-montserrat font-medium min-w-md p-2 bg-white/10 mt-5 rounded-lg">Create Task</button>
        </form>
    );
};

export default AddNewTask;