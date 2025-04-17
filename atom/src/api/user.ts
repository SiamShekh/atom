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
        History: build.query({
            query: () => ({
                url: "user/history",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        SpinWheel: build.mutation({
            query: ({ rotate, type }: { rotate: number, type: "coin" | "ads" }) => ({
                url: "user/spin",
                method: "POST",
                body: {
                    rotate, type
                }
            }),
            invalidatesTags: ["user"]
        }),
        TapCoin: build.mutation({
            query: (arg) => ({
                url: "user/tap",
                method: "POST",
                body: {
                    point: arg
                }
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
    useWatchAdsMutation: WatchAds,
    useSpinWheelMutation: SpinWheel,
    useHistoryQuery: History,
    useTapCoinMutation: TapCoin
} = user;