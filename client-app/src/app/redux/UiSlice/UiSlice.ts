import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface UiSliceState {
    editMode: boolean;
    loading: boolean;
    submitting: boolean;
}

const initialState: UiSliceState = {
    editMode: false,
    loading: true,
    submitting: false
}

export const UiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMode: (state, action: PayloadAction<{mode:string, status: boolean}>) => {
            if (action.payload.mode === 'edit') {
                state.editMode = action.payload.status;
            }
            if (action.payload.mode === 'loading') {
                state.loading = action.payload.status;
            }
            if (action.payload.mode === 'submitting') {
                state.submitting = action.payload.status;
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const {toggleMode} = UiSlice.actions

export default UiSlice.reducer