import { configureStore } from '@reduxjs/toolkit'
import activityReducer from './ActivitySlice/ActivitySlice';

export const store = configureStore({
    reducer: {
        activity: activityReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch