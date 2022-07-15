import React from 'react'
import { Navigate } from 'react-router-dom'

export default function createAccount(props) {
  return props.loggedIn ? <Navigate to="/"/> :
    <div>createAccount</div>
  
}
