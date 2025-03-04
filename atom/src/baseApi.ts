import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Env from './environment';

const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["task"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.DEV ? Env.dev : Env.live,

  }),
  endpoints: () => ({}),
});

export default baseApi;
