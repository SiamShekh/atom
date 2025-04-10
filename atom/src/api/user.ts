import baseApi from "../baseApi";

const user = baseApi.injectEndpoints({
    endpoints: (build) => ({
        instance: build.mutation({
            query: (arg) => ({
                url: "user",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["user"]
        }),
        MyUser: build.query({
            query: () => ({
                url: "user",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        Referlist: build.query({
            query: () => ({
                url: "user/referlist",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        UpdateReferCode: build.mutation({
            query: (arg) => ({
                url: "user/refer-code",
                method: "PATCH",
                body: {referCode:arg}
            }),
            invalidatesTags: ["user"]
        }),
    })
});

export const {
    useInstanceMutation: userLogin,
    useMyUserQuery: MyUser,
    useReferlistQuery:Referlist,
    useUpdateReferCodeMutation: UpdateReferCode
} = user;