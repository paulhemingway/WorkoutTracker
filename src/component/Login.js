import { useState, useEffect } from 'react'
import '../css/login.css'
import { Link, Navigate } from 'react-router-dom'
import { db, auth } from '../firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth"


export default function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [error, setError] = useState(false)

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      login()
    }
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const valid = () => {
    // validate email 
    var emailValid = email.toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    
    if(email.length === 0){
      setAuthError("Validation Error: Please enter an email!")
      setError(true)
      return false
    }

    if(!emailValid){
      setAuthError("Validation Error: Invalid email!")
      setError(true)
      return false
    } 

    if(password.length === 0){
      setAuthError("Validation Error: Please enter a password!")
      setError(true)
      return false
    }

    return true


  }

  const login = async () => {
    if(!valid()) return 
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    } catch (err) {
      // get rid of auth/ at the beggining and capitalize the first letter
      var msg = err.code.substring(5).replace('-', ' ')
      msg = msg.charAt(0).toUpperCase() + msg.slice(1)
      setAuthError("Authentication Failed: " + msg)
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
                <input type="text" name="email" id="email" placeholder="email" onChange={emailChange} onKeyPress={handleKeyPress} required></input>
              </div>
              <div className="password">
                <input type="password" name="username" id="username" placeholder="password" onChange={passwordChange} onKeyPress={handleKeyPress} required></input>
              </div>
              {error && <p className='error-msg'>{authError}</p>}
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
