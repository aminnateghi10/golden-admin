import {createSlice, current} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "./index";
import {pageCostsInterface} from "../components/contracts/userInterface";

interface CostsState {
    costs?: pageCostsInterface,
}

const initialState: CostsState = {
    costs: undefined,
}

export const Costs = createSlice({
    name: 'costs',
    initialState,
    reducers: {
        setCosts: (state, action:PayloadAction<pageCostsInterface>) => {
            state.costs = action.payload;
            return state
        },
        deleteCost: (state, action:PayloadAction<number>) => {
            // @ts-ignore
            state.costs.data = [...state?.costs.data?.filter(item => item.id != action.payload)];
            return state
        },
    }
});

export const {setCosts , deleteCost} = Costs.actions;
export const selectUser = (state: RootState) => state.costs;
export default Costs.reducer;