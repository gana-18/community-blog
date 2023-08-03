import { Routes,Route,Navigate,Link} from "react-router-dom";
function Login(){
  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API}/auth/google`,"_self")
  }
  return (
    <>
    <div className="login">
      <div className="login-btn">
        <h1>Sign up / Log in</h1>
        <div>
          <img src="/images/icons8-google-32.png" alt="google"/>
          <button onClick={googleAuth}>Continue with Google</button>
        </div>
      </div>
      <div className="login-text">
        <p>"It's amazing to see how fast devs go
              from 0 to Blog under a domain they own
              on Hashnode 🤯. It reminds me a lot of
              what Substack did for journalists."</p>
        <p>Guillermo Rauch</p><span>CEO, Vercel</span>
      </div>
    </div>
       
    </>
    
  )
}

export default Login
