import '../css/sidebar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { HiUserAdd, HiHome } from 'react-icons/hi'
import { BiLogOut, BiLogIn, BiDumbbell } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { IoChevronForward } from 'react-icons/io5' 




export default function Sidebar(props) {
  
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapse = function () {
    setCollapsed(!collapsed)
  }
    
  return (
    <div className={`sidebar clearfix ${collapsed ? 'collapsed' : ''}`}>
      <div className='title'>
        <Link to="/">
          <div className="centered">
            <BiDumbbell className="dumbbell icon"/>
            <span className={`link-text ${collapsed ? 'hidden' : ''}`}>LiftHub</span>
          </div>
        </Link>
      </div>

      {props.loggedIn && 
        <div className='nav-links'>
        <Link to="/">
          <div className="centered">
            <HiHome className="icon"/>
            <span className={`link-text ${collapsed ? 'hidden' : ''}`}>Home</span>
          </div>
        </Link>
      </div>
      }
        <div className='user-content'>
          {props.loggedIn &&
            <div>
              <Link to={'/profile/' + props.user.id}>
                <div className="centered link">
                  <FaUserAlt className="icon"/>
                  <span className={`link-text ${collapsed ? 'hidden' : ''}`}>{props.user.id}</span>
                </div>
              </Link>
              <Link to='/' onClick={props.logout}>
                <div className="centered link">
                  <BiLogOut className="icon"/>
                  <span className={`link-text ${collapsed ? 'hidden' : ''}`}>Log Out</span>
                </div>
              </Link>
              
            </div>
          }

          {(!props.loggedIn) &&
            <div>
              <Link to="/login" >
                <div className="centered link">
                  <BiLogIn className="icon"/>
                  <span className={`link-text ${collapsed ? 'hidden' : ''}`}>Login</span>
                </div>
              </Link>

              <Link to="/create-account">
                <div className="centered link">
                  <HiUserAdd className="icon"/>
                  <span className={`link-text ${collapsed ? 'hidden' : ''}`}>Create Account</span>
                </div>
              </Link>
            </div>
            
          }
          <div className={`collapse ${!collapsed && 'open'}`} onClick={toggleCollapse}>
            <IoChevronForward className='chevron'/>
          </div>
        </div>
        

      </div>
      
      

  )
}
