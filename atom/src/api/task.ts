import baseApi from "../baseApi";

const task = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTask: build.mutation({
            query: (arg) => ({
                url: "task",
                method: "POST",
                body: arg
            })
        })
    })
});

export const {
    useCreateTaskMutation: createTaskAdmin
} = task;