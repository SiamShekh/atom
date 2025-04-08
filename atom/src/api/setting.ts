import baseApi from "../baseApi";

const setting = baseApi.injectEndpoints({
    endpoints: (build) => ({
        setting: build.query({
            query: () => ({
                url: "/setting",
                method: "GET",
            })
        })
    })
});

export const {
    useSettingQuery
} = setting;