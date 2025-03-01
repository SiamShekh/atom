import baseApi from "../baseApi";

const user = baseApi.injectEndpoints({
    endpoints: (build) => ({
        instance: build.mutation({
            query: (arg) => ({
                url: "user",
                method: "POST",
                body: arg
            })
        })
    })
});

export const {
    useInstanceMutation: userLogin
} = user;