import {useState} from 'react'
import { Navigate, Link } from 'react-router-dom'
import '../css/createaccount.css'

export default function CreateAccount(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      
    }
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const usernameExists = () => {

  }

  const valid = () => {
    // validate email 
    var emailValid = email.toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    
    if(email.length === 0){
      setError(true)
      return false
    }

    if(!emailValid){
      setError(true)
      return false
    } 

    if(password.length === 0){
      setError(true)
      return false
    }

    return true


  } 

  return props.loggedIn ? <Navigate to="/"/> :
  <div className='create-account'>
    <h2>welcome!</h2>
    <div>

      <div className='form'>
        <h3>create an account</h3>

          <div className="inputs">
            
            <div className="email">
              <input type="text" name="email" id="email" placeholder="email" onChange={emailChange} onKeyPress={handleKeyPress} required></input>
            </div>
            <div className="password">
              <input type="password" name="username" id="username" placeholder="password" onChange={passwordChange} onKeyPress={handleKeyPress} required></input>
            </div>
            {error && <p className='error-msg'>{errMsg}</p>}
          </div>
          
          <div className="btn-container">
            <button className="btn">CREATE ACCOUNT</button>
          </div>
          <div className='signup-text'>
            <p><Link to="/login" >Already have an account?</Link></p>
          </div>              

        
      </div>
    </div>
</div>
  
}
