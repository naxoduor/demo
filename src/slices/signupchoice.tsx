import { createSlice } from '@reduxjs/toolkit';
export const signUpChoiceSlice = createSlice({
    name: "choice",
    initialState: {
        choice: false
    },
    reducers: {
        chooseSignUp: (state, action) => {
            state.choice=action.payload
        }
    }
})