import { createSlice } from '@reduxjs/toolkit';
const recordsArr: any[] = []

export const recordsSlice = createSlice({
    name: "records",
    initialState: {
        recordsList: recordsArr,
    },
    reducers: {
        addAllUserRecords: (state, action) => {
            state.recordsList.push(action.payload)
        }
    }
})
