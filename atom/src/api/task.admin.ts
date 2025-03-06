import baseApi from "../baseApi";

const task = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTask: build.mutation({
            query: (arg) => ({
                url: "task",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["task"]
        }),
        deleteTask: build.mutation({
            query: (arg) => ({
                url: "task",
                method: "DELETE",
                body: { taskId: arg }
            }),
            invalidatesTags: ["task"]
        }),
        getAllTask: build.query({
            query: () => ({
                url: "task",
                method: "GET",
            }),
            providesTags: ["task"]
        }),
        getSingleTask: build.query({
            query: (arg) => ({
                url: "task/admin",
                method: "GET",
                params: { id: arg }
            }),
            providesTags: ["task"]
        }),
        updateTask: build.mutation({
            query: (arg) => ({
                url: "task",
                method: "PATCH",
                body: arg.body,
                params: { id: arg.id }
            }),
            invalidatesTags: ["task"]
        }),
    })
});

export const {
    useCreateTaskMutation: createTaskAdmin,
    useGetAllTaskQuery: getAllTaskAdmin,
    useDeleteTaskMutation: deleteTask,
    useLazyGetSingleTaskQuery: singleTask,
    useUpdateTaskMutation: updateTask
} = task;