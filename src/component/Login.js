import { useState, useEffect } from 'react'
import '../css/login.css'
import { Link, Navigate } from 'react-router-dom'
import { db, auth } from '../firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth"


export default function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  

  const emailChange = (e) => {
    console.log(e.target.value)
  }

  const passwordChange = (e) => {
    console.log(e.target.value)
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        "phemingway@ymail.com",
        "password"
      );

    } catch (err) {
      console.error(err.code)
    }
  }

  return props.loggedIn ? <Navigate to="/"/>:
    <div className='login-container'>
      <div className="login">
        <h2>welcome back!</h2>
        
        <div className='login-form'>
          <h3>login</h3>

            <div className="inputs">
              
              <div className="email">
                <input type="email" name="email" id="email" placeholder="email" onChange={emailChange} required></input>
              </div>
              <div className="password">
                <input type="password" name="username" id="username" placeholder="password" onChange={passwordChange} required></input>
              </div>
            </div>
            <div className="btn-container">
              <button onClick={login} className="login-btn" >SIGN IN</button>
            </div>
            <div className='signup-text'>
              <p>Don't have an account? <Link to="/create-account" >Create an account</Link></p>
            </div>              

          
        </div>
        
      </div>
      <div className="slideshow">
        
      </div>
        
        

    </div>
  
}
