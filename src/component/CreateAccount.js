import {useState} from 'react'
import { Navigate, Link } from 'react-router-dom'
import '../css/createaccount.css'
import { db, auth } from '../firebase-config'
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth"
import { setDoc, doc  } from 'firebase/firestore'

export default function CreateAccount(props) {
  const [email, setEmail] = useState('')
  const [emailMsg, setEmailMsg] = useState('')
  const [emailErr, setEmailErr] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')
  const [passwordErr, setPasswordErr] = useState(false)

  const [confPassword, setConfPassword] = useState('')
  const [confPasswordMsg, setConfPasswordMsg] = useState('')
  const [confPasswordErr, setConfPasswordErr] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [firstNameMsg, setFirstNameMsg] = useState('')
  const [firstNameErr, setFirstNameErr] = useState(false)

  const [lastName, setLastName] = useState('')
  const [lastNameMsg, setLastNameMsg] = useState('')
  const [lastNameErr, setLastNameErr] = useState(false)

  const [username, setUsername] = useState('')
  const [usernameMsg, setUsernameMsg] = useState('')
  const [usernameErr, setUsernameErr] = useState(false)

  const [error, setError] = useState(false)


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

  const passwordConfChange = (e) => {
    setPassword(e.target.value)
  }

  const firstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const lastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const usernameChange = (e) => {
    setUsername(e.target.value)
  }

  const usernameExists = () => {


  }

  const emailExists = async () => {
      fetchSignInMethodsForEmail(auth, email)
        .then((res) => {
          console.log(res)
          if(res.length !== 0){
            setError(true)
            setEmailMsg("Email already exists.")
            setEmailErr(true)
          } 
        })
  }

  const emailValid = async () => {
    // validate email 
    var emailValid = email.toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    setEmailMsg("")
    setEmailErr(false)

    if(email.length === 0){
      setError(true)
      setEmailMsg("Must provide an email.")
      setEmailErr(true)
      return false
    }

    if(!emailValid){
      setError(true)
      setEmailMsg("Invalid email format")
      setEmailErr(true)
      return false
    } 

    emailExists()
  } 

  const register = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
    } catch (err) {
      console.error(err.code)
    }
  }

  const add = async function() {
      await setDoc(doc(db, "users", username, ({
        fName: firstName,
        lName: lastName,
        // uid: user.uid
      })))
    
  }

  const validate = async () => {

    await emailValid()
  }

  const submit = () => {
    setError(false)
    validate()
    if(error) return
  }

  return props.loggedIn ? <Navigate to="/"/> :
  <div className='create-account-container'>

    <div className="center">

    
      <div className='create-account'>
        <h2>welcome!</h2>
        <h3>create an account</h3>
        <div className='form'>
          
            <div className="name-row row">
              <div className='firstname-cont'>
                <input type="text" className={firstNameErr ? 'input-err' : ''} onChange={firstNameChange} name="firstname" id="firstname" placeholder="first name"></input>
                <p className='input-error-msg'>{firstNameMsg}</p>
              </div>
              <div>
                <input type="text" className={lastNameErr ? 'input-err' : ''} onChange={lastNameChange} name="lastname" id="lastname" placeholder="last name"></input>
                <p className='input-error-msg'>{lastNameMsg}</p>
              </div>
              
            </div>

            <div className="row">
              <div className="username-cont">
                <input type="text" className={usernameErr ? 'input-err' : ''} onChange={usernameChange} name="username" id="username" placeholder="username"></input>
                <p className='input-error-msg'>{usernameMsg}</p>
              </div>
              <div>
                <input type="email" className={emailErr ? 'input-err' : ''} onChange={emailChange} name="email" id="email" placeholder="email"></input>
                <p className='input-error-msg'>{emailMsg}</p>
              </div>
            </div>
            <div className="pass-row row">
              <div className="firstpass-cont">
                <input type="text" className={passwordErr ? 'input-err' : ''} onChange={passwordChange} name="password" id="password" placeholder="password"></input>
                <p className='input-error-msg'>{passwordMsg}</p>
              </div>
              <div>
                <input type="text" className={confPasswordErr ? 'input-err' : ''} onChange={passwordConfChange} name="confpassword" id="confpassword" placeholder="confirm password"></input>
                <p className='input-error-msg'>{confPasswordMsg}</p>             
              </div>
            </div>
            
            
            <div className="btn-container">
              <button className="btn" onClick={submit}>CREATE ACCOUNT</button>
            </div>
            <div className='login-text'>
              <p><Link to="/login" >Already have an account?</Link></p>
            </div>              
        </div>
      </div>
      </div> 
      <div className="slideshow">

      </div>
    
</div>
  
}
