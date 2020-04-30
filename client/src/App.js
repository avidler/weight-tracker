import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import './App.css';

//import Login from './pages/Login'
import User from './pages/User'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("") 
  const [userWeights, setUserWeights] = useState([])
  const [status, setStatus] = useState("Loading...")
  const [dataLoaded, setDataLoaded] = useState(false)
  const [newDate, setNewDate] = useState(new Date().toISOString().substr(0, 10))
  const [newWeight, setNewWeight] = useState(null)

  const usernamebox = useRef(null);

  let today = new Date().toISOString().substr(0, 10);

  

  async function getUsers () {
    await axios.get('/users')
    .then((response) => {
        let data = response.data.filter((res, i) => (res.username===username));
        setUserWeights(data.length > 0 ? data[0].weights : []) 
       
        setStatus("")
    })


    .then(() => {
        setDataLoaded(true)
    })
}

function sortWeights() {
  setUserWeights(prevWeights => (
    [...prevWeights,({date:newDate, weight:newWeight})]
 ).sort((a,b) => Date.parse(new Date(b.date)) - Date.parse(new Date(a.date)))) 
}

function addNewUser() {
        
        
  axios.post('/users/add', {username:username})
  .then(res => console.log(res.data))
}  

    function submitWeight(e){
      e.preventDefault();
      console.log("new date: ", newDate)
      console.log("new weight: ", newWeight)
      console.log("userweights before concat: ", userWeights)
      setUserWeights(prevWeights => (
               [...prevWeights,({date:newDate, weight:newWeight})]
            ).sort((a,b) => Date.parse(new Date(b.date)) - Date.parse(new Date(a.date))))
 
      setNewDate("")
      setNewWeight(0)
      

      }

      function removeWeight(oldDate){
        console.log("oldDate: ",oldDate)
        
        setUserWeights(userWeights.filter(q => new Date(q.date).toDateString() !== new Date(oldDate).toDateString()));
      }
     

    function handleDateChange(e) {
      const {value} = e.target
      setNewDate(value)
    }

    function handleWeightChange(e) {
      const {value} = e.target
      setNewWeight(value)
    }

  function handleUsernameChange(e) {
    const {value} = e.target
    setUsername(value)
  }

  
  
  function submitName(e) {
    e.preventDefault();
    setIsLoggedIn(true)
    getUsers()
  }

  function logout(e) {
    e.preventDefault();
    axios.post('/weights/add', {username:username, newWeights:userWeights})
    .then(res => {console.log(res.data)})
    setUsername("")
    setIsLoggedIn(false)
   
  }
  


  return (
 
    <div className="App">
      <header className="header header-home main-grid">
        <div className="header-content">
          <h1>Weight Tracker</h1>

        </div>
      </header>

      <main> 
        <section className="info main-grid"> 
          {isLoggedIn ? 
            <div className="col">
              {dataLoaded ?
                <div className="col">
                  <h2>User Data for {username}</h2>
                  <div>
                  <span className="input-group-btn"></span>
                  <div>{status}</div>
                  <div>
                    <h3>Add New Weight</h3>
                    
                    <form onSubmit={submitWeight}>
                      <label htmlFor="date">
                      Date
                      <input 
                        type="date" 
                        id="dateTextBox" 
                        value={newDate}
                        onChange = {handleDateChange} 
                      />
                      </label>
                      <label htmlFor="weight">
                      Weight
                      <input 
                        type="number" 
                        id="weightTextBox" 
                        
                        value={newWeight}  
                        onChange = {handleWeightChange} 
                      />
                      </label>
                      <input className="submit-button" type="submit" value="Submit"  />
                     
                    </form>
                     <button onClick={logout} className="submit-button">Save and logout</button>
                  </div>
                  <div className="weightboard">
                  <h3>Weight History</h3>
                  {console.log("userWeights.length: ", userWeights.length)}
                  {userWeights.length > 0 ? 
                    <table className="weights">
                      <thead><tr><th>Date</th><th>Weight</th><th></th></tr></thead>
                      <tbody>
                      {userWeights.map((user) => 
                        <tr key={user.date}>
                        <td id="post-date">{new Date(user.date).toDateString()} </td>
                        <td id="post-weight"> {user.weight}</td>
                        <td><button onClick={() => {removeWeight(user.date)}}>X</button></td>
                        </tr>
                      )}
                      </tbody>
                    </table>
                  :
                    <div>{addNewUser()} 
                      <div>New User Created</div>
                      No data for this user yet...
                    </div>
                  }
                </div>
                </div>
                </div>
              :
                <div>Data loading...</div>
              }
              
            </div>
          :
            <div className="form col">
              <h2>Login or signup</h2>
              <form onSubmit={submitName}>
                <label>
                <input 
                  type="text" 
                  id="usernamebox" 
                  className="form-control input-text"
                  ref={usernamebox} 
                  value={username} 
                  onChange = {handleUsernameChange} 
                />
                </label>
                <input className="submit-button" type="submit" value="Submit"  />
              </form>
            </div>
          }
        </section>
      </main>
    </div>
  );
}



export default App;
