import baseApi from "../baseApi";

const task_api = baseApi.injectEndpoints({
    endpoints: (build) => ({
        allTask: build.query({
            query: () => ({
                url: "task/user",
                method: "GET"
            }),
            providesTags: ["task"]
        }),
        compeleteTask: build.mutation({
            query: ({ id }: { id: string }) => ({
                url: "task/user",
                method: "POST",
                body: { id }
            }),
            invalidatesTags: ["task"]
        }),
    })
});

export const {
    useAllTaskQuery: allTask,
    useCompeleteTaskMutation:compeleteTask
} = task_api;