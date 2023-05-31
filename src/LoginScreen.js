import React,{ useState } from 'react';
import "./LoginScreen.css";
import SignInScreen from "./SignInScreen"

function LoginScreen() {
  const [signIn,setsignIn]= useState(false);
  return (
    <div className='loginScreen'>
       <div className='loginScreen_backgound'>
         <img className='loginScreen_logo' src="https://th.bing.com/th/id/R.2ea85d7448475a744c1485c2eac3d3d1?rik=LOSTtarBPEnY%2fw&riu=http%3a%2f%2fwww.freepnglogos.com%2fuploads%2fnetflix-logo-0.png&ehk=PaZLUHaWmwAMEzdIDx7zGpBu053ZpXipTljxBidJnfU%3d&risl=&pid=ImgRaw&r=0" alt=""/>  
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