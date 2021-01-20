import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import addUser from '../slices/userSlice'
import { userSlice } from '../slices/userSlice'
export default function AddUsers() {
    const [value, setValue] = useState("")
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(userSlice.actions.addUsers(value))
        setValue("")
    }
    return (
        <form>
            <input value={value} onChange={handleChange}></input>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}
