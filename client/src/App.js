import React, { useState, useEffect, useRef } from 'react';
import './App.css';

//import Login from './pages/Login'
import User from './pages/User'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("") 

  const usernamebox = useRef(null);

  useEffect(() => {
    usernamebox.current.focus();
    console.log("username: ", username)
    console.log("isLoggedIn: ", isLoggedIn)
  }, []);

  function handleChange(e) {
    const {value} = e.target
    setUsername(value)
  }

  
  
  function submitName(e) {
    e.preventDefault();
    setIsLoggedIn(true)
    
  }

  function logout(e) {
    e.preventDefault();
    setUsername("")
    setIsLoggedIn(false)
   
  }

  return (
    <div className="App">
      <h1>App Title</h1>
      <h3>{isLoggedIn}</h3>
        {isLoggedIn ? 
        <div>
        <User username={username} isLoggedIn={isLoggedIn}/> 
        <button onClick={logout}>Click to logout</button>
        </div>
        : 

      <div>
        <h2>
        Login or signup</h2>
        <form onSubmit={submitName}>
            <label>
                <input type="text" id="usernamebox" ref={usernamebox} value={username} onChange = {handleChange} />
               
            </label>
            <input type="submit" value="Submit" />
        </form>
      </div>

        }
    </div>
  );
}



export default App;
