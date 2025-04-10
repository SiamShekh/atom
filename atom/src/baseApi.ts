import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Env from './environment';

const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["task", "user"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.DEV ? Env.dev : Env.live,
    prepareHeaders(headers) {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("authorization", `${token}`);
      }
    },
  }),
  endpoints: () => ({}),

});

export default baseApi;
