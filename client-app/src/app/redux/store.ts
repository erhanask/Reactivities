import { configureStore } from '@reduxjs/toolkit'
import activityReducer from './ActivitySlice/ActivitySlice';
import uiReducer from './UiSlice/UiSlice';

export const store = configureStore({
    reducer: {
        activity: activityReducer,
        ui: uiReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch