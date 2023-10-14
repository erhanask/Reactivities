import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {Activity} from "../../models/activity.ts";

export interface ActivityState {
    activities: Activity[];
    selectedActivity: Activity | undefined;
}

const initialState: ActivityState = {
    activities: [],
    selectedActivity: undefined
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setActivities: (state, action: PayloadAction<Activity[]>) => {
            state.activities = action.payload;
        },
        addActivity: (state, action: PayloadAction<Activity>) => {
            state.activities = [...state.activities, action.payload];
        },
        updateActivity: (state, action: PayloadAction<Activity>) => {
            state.activities = [...state.activities.filter(
                activity => activity.id !== action.payload.id
            ), action.payload];
        },
        deleteActivity: (state, action: PayloadAction<string>) => {
            state.activities = [...state.activities.filter(
                activity => activity.id !== action.payload
            )];
        },
        setSelectedActivity: (state, action: PayloadAction<string|undefined>) => {
            state.selectedActivity = state.activities.find(
                x => x.id === action.payload
            );
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setActivities,
    addActivity,
    updateActivity,
    deleteActivity,
    setSelectedActivity} = activitySlice.actions

export default activitySlice.reducer