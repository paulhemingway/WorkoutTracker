import { useState, useEffect } from "react"
import { db, auth } from './firebase-config'
import { collection, getDoc, setDoc, doc, query, where, getDocs  } from 'firebase/firestore'
import "./App.css"
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut
} from "firebase/auth"
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'


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
  const [loggedIn, setLoggedIn] = useState(true)
  const [location, setLocation] = useState('/')

  // whenever authentication changes (login/out) do something
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    setLoggedIn(currentUser !== null)

  })

  useEffect(() => {
    if(user) getUserInfo(user.uid)
  }, [user])
  
  // triggers when userInfo is altered, only console logs if it's not empty thoough
  useEffect(() => {
    if(Object.keys(userInfo).length !== 0){
    }
  }, [userInfo])

  const getUserInfo = async (uid) => {
    if(user !== null && Object.keys(user).length !== 0){
        let querySnapshot
        // soon this will grab username from the uid, provided by the auth information
        const getSingleUser = async function() {
          const usersRef = collection(db, "users")
          const q = query(usersRef, where("uid", "==", uid))

          querySnapshot = await getDocs(q)
        }
        getSingleUser().then(() => {
          setUserInfo({
            id: querySnapshot.docs[0].id,
            info: querySnapshot.docs[0].data()
          })
        })
        console.log(userInfo)
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

