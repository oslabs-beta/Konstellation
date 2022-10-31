import React, { createContext, useInsertionEffect, useReducer } from 'react'
import ACTIONS from '../constants/constants'
import { authReducer } from '../reducers/authReducer';

const initialState = {loggedIn: true}
export const AuthContext:React.Context<any> = createContext(initialState); // pass default context here

type Props = []

export const AuthContextProvider = (children: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useInsertionEffect(() => {
  })

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext.Provider