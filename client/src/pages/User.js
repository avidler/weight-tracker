import React, { useState, useEffect } from 'react'
import axios from 'axios'

import WeightsTable from './components/WeightsTable'
//import AddNewWeight from './components/AddNewWeight'
import AddNewUser from './components/AddNewUser'

function User(props) {
    const username = props.username
    const isLoggedIn = props.isLoggedIn
    const [userWeights, setUserWeights] = useState([])
    const [status, setStatus] = useState("Loading...")
    const [dataLoaded, setDataLoaded] = useState(false)
    const [newDate, setNewDate] = useState("")
    const [newWeight, setNewWeight] = useState(0)
    
 
    useEffect(() => {
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
    },[username])

    const submitWeight = (e) => {
        e.preventDefault();
        console.log("new date: ", newDate)
        console.log("new weight: ", newWeight)
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
                        <label htmlFor="date">
                            Date
                            <input type="date" id="date" value={newDate} onChange = {handleDateChange} />
                        </label>
                        <label htmlFor="weight">
                            Weight
                            <input type="number" id="weight" value={newWeight}  onChange = {handleWeightChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div className="weightboard">
                    <h2>Weight History</h2>

                    {
                    userWeights.length > 0 ? 
                    <WeightsTable userWeights={userWeights} />:
                    <div><AddNewUser username={username}/>No data for this user yet...</div>
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