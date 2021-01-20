import React, { useState, useEffect } from 'react'
import { signUpChoiceSlice } from '../slices/signupchoice'
import history from '../history'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux'
import { gql, useQuery } from '@apollo/client'


const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
}));

let signUpMutation = `mutation{
    createUser(registerInput:{
      firstName:"ronny", lastName:"odero",email:"ronny@gmail.com",password:"ronny"
    })
  }`

let signInQuery = gql`query {
    posts {
      id
      title
    }
}
    `

export default function Header() {
    const classes = useStyles();
    const [value, setValue] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        
    })  
    

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        dispatch(signUpChoiceSlice.actions.chooseSignUp(false))
    }

    const requestBody = {
        query:`query {
            posts {
              id
              title
            }
        }`
    }

    const handleSignUpSubmit = (event) => {
        event.preventDefault()
        console.log("handleSignUpSubmit")
        fetch('http://localhost:4000/graphql',{
            method:'POST',
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.status!==200 && res.status!=201){
                throw new Error('Failed')
            }
            else return res.json()
        }).then(resData=>{
            console.log(resData.data.posts)
        }).catch(err=>{
            console.log(err)
        })
        dispatch(signUpChoiceSlice.actions.chooseSignUp(true))
    }

    return (
        <React.Fragment>    
            <Toolbar className={classes.toolbar}>
                <Button variant="outlined" size="small" onClick={handleLoginSubmit}>Login</Button>
                <Button variant="outlined" size="small" onClick={() => history.push('/records')}>Add Record/View Records</Button>
                <Button variant="outlined" size="small" onClick={handleSignUpSubmit}>
                    Sign up
        </Button>
            </Toolbar>
        </React.Fragment>
    )
}
