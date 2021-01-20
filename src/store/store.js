import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import {userSlice} from '../slices/userSlice'
import {signUpChoiceSlice} from '../slices/signupchoice'
import {recordsSlice} from '../slices/recordsSlice'

export default configureStore({
    reducer:{
        users:userSlice.reducer,
        choice:signUpChoiceSlice.reducer,
        records:recordsSlice.reducer
    }
})