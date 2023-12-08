import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "./index";
import {UserInterface} from "../components/contracts/userInterface";

interface UserState {
    user?: UserInterface,
}

const initialState: UserState = {
    user: undefined,
}

export const User = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any | UserInterface>) => {
            state.user = action.payload
            return state
        },
    }
});

export const {setUser} = User.actions;
export const selectUser = (state: RootState) => state.user;
export default User.reducer;