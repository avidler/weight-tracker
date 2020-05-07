import React, { useState, useRef } from 'react';
import axios from 'axios'
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("") 
  const [userWeights, setUserWeights] = useState([])
  const [dailyLoss, setDailyLoss] = useState([])
  const [status, setStatus] = useState("Loading...")
  const [dataLoaded, setDataLoaded] = useState(false)
  const [newDate, setNewDate] = useState(new Date().toISOString().substr(0, 10))
  const [newWeight, setNewWeight] = useState(null)

  const usernamebox = useRef(null);

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

/*
function sortWeights() {
  setUserWeights(prevWeights => (
    [...prevWeights,({date:newDate, weight:newWeight})]
 ).sort((a,b) => Date.parse(new Date(b.date)) - Date.parse(new Date(a.date)))) 
}
*/

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
        <section className="info"> 
          {isLoggedIn ? 
            <div>
              {dataLoaded ?
                <div className="main-grid">
                  <div className="username-title col">
                    <h2>User Data for {username}</h2>
                  </div>
                <div className="col">
                  <div>
                    <span className="input-group-btn"></span>
                    <div>{status}</div>
                    <div className="add-weight col">
                      <h3>Add New Weight</h3>
                      <div className="new-weight-form">
                        <form onSubmit={submitWeight}>
                          
                          <label htmlFor="date">
                          <div className="new-date-input">
                            <div className="new-date-input-label">Date</div>
                            <div className="new-date-input-box">
                              <input 
                                type="date" 
                                id="date-textbox" 
                                value={newDate}
                                onChange = {handleDateChange} 
                              />
                            </div>
                          </div>
                          </label>
                          
                          <label htmlFor="weight">
                          <div className="new-weight-input">
                            <div className="new-weight-input-label">Weight</div>
                            <div className="new-weight-input-box">
                              <input 
                                type="number" 
                                id="weight-textbox" 
                                value={newWeight}  
                                onChange = {handleWeightChange} 
                              />
                            </div>
                          </div>
                          </label>
                          
                          <div className="new-weight-details-submit">
                            <input className="submit-button" type="submit" value="Submit"  />
                            <button onClick={logout} className="submit-button">Save and logout</button>
                          </div>
                        </form>
                      </div>
                      
                    </div>
                    <div className="weightboard col">
                      <h3>Weight History</h3>
                      {console.log("userWeights.length: ", userWeights.length)}
                      {userWeights.length > 0 ? 
                      <table className="weights">
                        <thead><tr><th>Date</th><th>Weight</th>{/*<th>Loss</th><th>Date Diff</th>*/}<th>Ave Daily Loss</th><th></th></tr></thead>
                        <tbody>
                        {userWeights.map((user, i) => 
                        <tr key={user.date}>
                        <td id="post-date">{new Date(user.date).toDateString()} </td>
                        <td id="post-weight"> {user.weight}</td>
                        {/*<td id="post-weight-diff">{i<userWeights.length-1 ? userWeights[i+1].weight-user.weight : 0}</td>
                        <td id="post-date-diff">{i<userWeights.length-1 ? (Date.parse(new Date(user.date)) - Date.parse(new Date(userWeights[i+1].date)))/(1000*60*60*24) : 0}</td>
                        */}<td id="post-ave-date-diff">{i<userWeights.length-1 ?  Math.round((userWeights[i+1].weight-user.weight) / ((Date.parse(new Date(user.date)) - Date.parse(new Date(userWeights[i+1].date)))/(1000*60*60*24)) * 100)/100  : 0}</td>
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
                </div>
              :
                <div>Data loading...</div>
              }
              
            </div>
          :
            <div className="main-grid">
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
            </div>
          }
        </section>
      </main>
    </div>
  );
}



export default App;
