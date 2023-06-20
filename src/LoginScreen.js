import React,{ useState } from 'react';
import "./LoginScreen.css";
import SignInScreen from "./SignInScreen"
import logo from '../src/images/logo.png';

function LoginScreen() {
  const [signIn,setsignIn]= useState(false);
  return (
    <div className='loginScreen'>
       <div className='loginScreen_backgound'>
         <img className='loginScreen_logo' src={logo} alt=""/>  
         <div className='loginScreen_gradient' />
        </div>
        <div className='loginScreen_body'>
        {signIn ? (<SignInScreen />)
           : (
         <>
          <h1>
            Unlimited films, TV programmes and more.
          </h1>
          <h2>Watch anywhere and anytime</h2>
          <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
          <div className='loginScreen_input'>
            <form>
                <button onClick={()=>setsignIn(true)} className='loginScreen_email'>GET STARTED</button>
            </form>
          </div>
          </>
          )
        }
        
        </div>
    </div>
  )
}

export default LoginScreen