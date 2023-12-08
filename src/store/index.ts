import {configureStore} from '@reduxjs/toolkit'
import User from "./user";
import Costs from "./costs";

export const store = configureStore({
    reducer: {
        user : User,
        costs : Costs
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch