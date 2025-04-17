import { createSlice } from "@reduxjs/toolkit";

const tap = createSlice({
    name: "tap",
    initialState: {
        currentLvl: "Starter",
        nextLvl: "Pro",
        point: 0,
        limit: 50,
        tap: 0,
        nextTarget: 0
    },
    reducers: {
        newTap: (state) => {
            state.point += 10;
            state.tap += 1;
        },
        clear: (state) => {
            state.point = 0;
            state.tap = 0;
        }
    }
})

export default tap;