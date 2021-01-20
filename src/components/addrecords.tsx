import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RecordsTable from './recordstable'
import ErrorPage from './ErrorPage'
import { recordsSlice } from '../slices/recordsSlice'
import { useDispatch } from 'react-redux'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));


export default function AddRecords(props) {
    let userDetailsList = props.user.loginDetails
    let userDetails
    if (userDetailsList) {
        userDetails = userDetailsList[0]
    }
    const classes = useStyles();

    const [allValues, setAllValues] = useState({
        title: '',
        description: '',
    });

    let requestBody
    if(userDetails){
    requestBody = {
        query: `mutation{
            createRecord(recordsInput:{
              title:"${allValues.title}",description:"${allValues.description}", userId:${userDetails.userId}
            }){
          title,
          description,
          userId
        }
          }
        `
    }
}

    const changeHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch()

    const handleAddRecordSubmit = (event) => {
        event.preventDefault()
        console.log("print all values", allValues)
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Authorization': `Bearer ${userDetails.token}`, 
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("found response", res)
            if (res.status !== 200 && res.status != 201) {
                throw new Error('Failed')
            }
            else return res.json()
        }).then(resData => {
            dispatch(recordsSlice.actions.addAllUserRecords(resData.data.createRecord))
            setAllValues({
                title: "",
                description: ""
              });
        }).catch(err => {
            console.log('error found', err)
        })
    }

    return userDetails?  (
        <div>
            <form>
                <TextField
                    label="Record Title"
                    id="margin-none"
                    name="title"
                    defaultValue="Record Title"
                    className={classes.textField}
                    helperText="Record Title"
                    value={allValues.title}
                    onChange={changeHandler}
                />

                <TextField
                    id="filled-full-width"
                    name="description"
                    label="Record"
                    style={{ margin: 8 }}
                    placeholder="Record Detaiks"
                    helperText="Record Details!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    value={allValues.description}
                    onChange={changeHandler}
                />
                <Button variant="contained" color="primary" disableElevation onClick={handleAddRecordSubmit}>
                    Add Record
    </Button>
                <RecordsTable records={props.records}/>
            </form>
        </div>
    ):<ErrorPage/>
}
