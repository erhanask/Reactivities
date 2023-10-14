import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Activity} from "../../models/activity.ts";

export interface ActivityState {
    activities: Activity[];
}

const initialState: ActivityState = {
    activities: [],
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setActivities: (state, action: PayloadAction<Activity[]>) => {
            state.activities = action.payload;
        },
        addActivity: (state, action: PayloadAction<Activity>) => {
            state.activities = [...state.activities,action.payload];
        },
        updateActivity: (state, action: PayloadAction<Activity>) => {
            state.activities = [...state.activities.filter(activity => activity.id !== action.payload.id), action.payload];
        },
        deleteActivity: (state, action: PayloadAction<string>) => {
            state.activities = [...state.activities.filter(activity => activity.id !== action.payload)];
        }
    }
})

// Action creators are generated for each case reducer function
export const { setActivities, addActivity, updateActivity, deleteActivity } = activitySlice.actions

export default activitySlice.reducer