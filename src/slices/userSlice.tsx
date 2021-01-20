import { createSlice } from '@reduxjs/toolkit';
const arr: any[] = []
const loginarr: any[] = []

export const userSlice = createSlice({
    name: "users",
    initialState: {
        usersList: arr,
        loginDetails:loginarr
    },
    reducers: {
        addUsers: (state, action) => {
            state.usersList.push(action.payload)
            console.log("sttae in create slice", state)
        },
        loginUser:(state, action)=>{
            state.loginDetails.push(action.payload)
        }
    }
})
