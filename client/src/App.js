import React, { useState } from 'react';
import './App.css';

//import Login from './pages/Login'
import User from './pages/User'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("") 

  function handleChange(e) {
    const {value} = e.target
    setUsername(value)
  }
  
  function submitName(e) {
    e.preventDefault();
    setIsLoggedIn(true)
    
  }

  return (
    <div className="App">
      <h1>App Title</h1>
      <h3>{isLoggedIn}</h3>
        {isLoggedIn ? 
        
        <User username={username}/> 
        : 

      <div>
        <h2>
        Login or signup</h2>
        <form onSubmit={submitName}>
            <label>
                <input type="text" value={username} onChange = {handleChange} />
               
            </label>
            <input type="submit" value="Submit" />
        </form>
  
   
</div>

        }
    </div>
  );
}



export default App;
