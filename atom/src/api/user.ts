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
                body: { referCode: arg }
            }),
            invalidatesTags: ["user"]
        }),
        WatchAds: build.mutation({
            query: () => ({
                url: "user/watch-ads",
                method: "POST",
            }),
            invalidatesTags: ["user"]
        }),
    })
});

export const {
    useInstanceMutation: userLogin,
    useLazyMyUserQuery: MyUser,
    useReferlistQuery: Referlist,
    useUpdateReferCodeMutation: UpdateReferCode,
    useWatchAdsMutation: WatchAds
} = user;