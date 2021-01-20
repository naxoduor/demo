import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import logo from './logo.svg'
import './App.css';
import AddUser from './components/addusers'
import SignUp from './components/signup'
import SignIn from './components/signin'
import Header from './components/Header'
import AddRecord from './components/addrecords'
import history from './history'
import * as Constants from './constants'
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Router as Router, Switch, Route } from 'react-router-dom';
function App() {
  let [signup, setSignUp] = useState({ signup: false })
  const dispatch = useDispatch()
  const signUpChoice = useSelector(state => state.choice)
  const user = useSelector(state => state.users)
  const records = useSelector(state => state.records)

  console.log("print props in app", signUpChoice, user)
  let auth

  useEffect(() => {
    setSignUp(signUpChoice)
  })
  if (signup.choice) {
    auth = <SignUp />
  }
  else {
    auth = <SignIn user={user}/>
  }
  return (
      <div className="App">
        <Header />
        <Router history={history}>
          <Switch>
            <Route path='/' exact render={() =>auth}/>
            <Route path='/records' exact render={()=><AddRecord user={user} records={records}/>}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
