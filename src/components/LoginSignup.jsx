import React, { useState } from 'react'
import "./LoginSignup.css";

function LoginSignup() {
const [action, setAction] = useState("Login");

  return (
    <div className='container'>
      <div className="haeder">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action==="Login" ? <div></div> : <div className="input">
        <i className="fas fa-user" />
            <input type="text" placeholder='Name'/>
        </div>}
        
        <div className="input">
        <i className="fas fa-envelope" />
            <input type="email" placeholder='Email'/>
        </div>
        <div className="input">
        <i className="fas fa-lock" />
            <input type="password"placeholder='Password' />
        </div>
      </div>
      {action==="Sign up" ? <div></div> : <div className="forgot-password">Forgot password? <span>Click here!</span></div>}
      
      <div className="submit-container">
        <div className={action==="Login"? "submit gray":"submit"} onClick={()=>{setAction("Sign up")}}>Sign up</div>
        <div className={action==="Sign up"? "submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
    </div>
  )
}

export default LoginSignup
