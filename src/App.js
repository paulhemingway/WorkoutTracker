import { useState, useEffect } from "react"
import { db, auth } from './firebase-config'
import { collection, getDoc, setDoc, doc  } from 'firebase/firestore'
import "./App.css"
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut
} from "firebase/auth"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Home from "./component/Home"
import Login from "./component/Login"
import NoPage from "./component/NoPage"
import CreateAccount from "./component/CreateAccount"
import Sidebar from "./component/Sidebar"
import Profile from "./component/Profile"
import PrivateRoute from "./component/PrivateRoute"

function App() {
  const [user, setUser] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [newUser, setNewUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true)

  // whenever authentication changes (login/out) do something
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    setLoggedIn(currentUser !== null)

  })
    // when user state changes
  useEffect(() => {
      const add = async function() {
        // if it's a user that just registered...
        if(newUser){
          await setDoc(doc(db, "users", "pshfmg"), ({
            fName: "Paul",
            lName: "Hemingway",
            uid: user.uid
          }))
        }
      }

      // run add command, then get user info 
      add().then(() => {
        if(user !== null && Object.keys(user).length !== 0){
          getUserInfo()
        }
      })
      setNewUser(false)
  }, [user])
  
  // triggers when userInfo is altered, only console logs if it's not empty thoough
  useEffect(() => {
    if(Object.keys(userInfo).length !== 0){
    }
  }, [userInfo])

  const getUserInfo = async () => {
    if(user !== null && Object.keys(user).length !== 0){
        let docSnap
        // soon this will grab username from the uid, provided by the auth information
        const getSingleUser = async function() {
          const docRef = doc(db, "users", "pshfmg")
          docSnap = await getDoc(docRef)
        }
      
        getSingleUser().then(() => {
          setUserInfo({
            id: docSnap.id,
            info: docSnap.data()
          })
        })
        console.log(userInfo)
    } 
  }

  const register = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        "phemingway@ymail.com",
        "password"
      )
      setNewUser(true)
    } catch (err) {
      console.error(err.code)
    }
  }


  const logout = async () => {
    await signOut(auth)
    setUserInfo({})
  }


  return <div className={`app-container`} > 
    <Router>
      
      
      <div className="sidebar-container">
        <Sidebar 
          loggedIn={loggedIn} 
          user={userInfo} 
          logout={logout} 
           />
        {/* <button onClick={register}>register</button> */} 
      </div>
    
    {/* https://www.youtube.com/watch?v=SLfhMt5OUPI&t=504s watch this vid  */}
      <div className="content-container ">
        <Routes>
          <Route path="/" element={
            <PrivateRoute loggedIn={loggedIn} component={<Home />}/>}></Route>
          <Route path='/login' element={< Login loggedIn={loggedIn}/>}></Route>

          <Route path='/create-account' element={<CreateAccount loggedIn={loggedIn}/>}></Route>
          
          <Route path='/profile/:id' element={
            <PrivateRoute loggedIn={loggedIn} component={<Profile info={userInfo} />}/>
          } />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
   
    
    </Router>
  </div>
}

export default App;

