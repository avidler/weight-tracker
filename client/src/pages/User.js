import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function User(props) {
    const username = props.username
    const isLoggedIn = props.isLoggedIn
    const [userWeights, setUserWeights] = useState([])
    const [status, setStatus] = useState("Loading...")
    const [dataLoaded, setDataLoaded] = useState(false)
    const [newDate, setNewDate] = useState("")
    const [newWeight, setNewWeight] = useState(0)
    
    const didMountRef = useRef(false)
    useEffect(() => {
        if (didMountRef.current){
            console.log(didMountRef)
        }
        else{
            didMountRef.current = true
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
            getUsers()
        }
    })
      
    function addNewUser() {
        
        
        axios.post('/users/add', {username:username})
        .then(res => console.log(res.data))
    }  

    function submitWeight(e){
        e.preventDefault();
        
        console.log("new date: ", newDate)
        console.log("new weight: ", newWeight)
        setUserWeights(...userWeights,{newDate, newWeight})
        console.log("new userWeights: ", userWeights)
        setNewDate(newDate)
        setNewWeight(newWeight)
        console.log("isLoggedIn just before weight add: ", isLoggedIn)
        axios.post('/weights/add', {username:username, date:newDate, weight:newWeight})
        .then(res => {console.log(res.data)})
        }
    
    
          function handleDateChange(e) {
            const {value} = e.target
            setNewDate(value)
          }
    
          function handleWeightChange(e) {
            const {value} = e.target
            setNewWeight(value)
          }
    

    if (dataLoaded) {
    return (
       
        <div>
            <h2>User Data for {username}</h2>
            <div>
            <span className="input-group-btn">
           
            </span>
                <div>{status}</div>
                <div>
                    <h2>Add New Weight</h2>
                    <form onSubmit={submitWeight}>
                        <label htmlFor="date" className="date-label" for="date">
                            Date
                            <input 
                                type="date" 
                                id="date" 
                                className="date-input" 
                                value="30/04/2020"
                                onChange = {handleDateChange} />
                        </label>
                        <label htmlFor="weight" className="weight-label" for="weight">
                            Weight
                            <input 
                                type="number" 
                                id="weight" 
                                class="form-control input-text weight-input" 
                                onFocus = {() => this.inputField.value = ""} 
                                value={newWeight}  
                                onChange = {handleWeightChange} 
                            />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div className="weightboard">
                    <h2>Weight History</h2>

                    {console.log("userWeights.length: ", userWeights.length)}
                    {
                    userWeights.length > 0 ? 
                    <table className="weights">
                    <thead><tr><th>Date</th><th>Weight</th></tr></thead>
                    <tbody>
                    {userWeights.map((user) => 
                        <tr key={user.date}>
                        <td id="post-date">{new Date(user.date).toDateString()} </td>
                        <td id="post-weight"> {user.weight}</td>
                        </tr>
                    )}
                    </tbody>
                    </table>
:
                    <div>{addNewUser}/> <div>
                    New User Created
                    </div>No data for this user yet...</div>
                    }
           
                </div>
            </div>
        </div>
                
    )
    }else{
        return null
    }
}

export default User