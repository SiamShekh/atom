import baseApi from "../baseApi";

const task_api = baseApi.injectEndpoints({
    endpoints: (build) => ({
        allTask: build.query({
            query: () => ({
                url: "task/user",
                method: "GET"
            })
        })
    })
});

export const {
    useAllTaskQuery: allTask
} = task_api;