import React, { useState, useEffect } from 'react'
import axios from 'axios'

import WeightsTable from './components/WeightsTable'
import AddNewWeight from './components/AddNewWeight'
import AddNewUser from './components/AddNewUser'

function User(props) {
    const username = props.username
    const [userWeights, setUserWeights] = useState([])
    const [status, setStatus] = useState("Loading...")
    
 
    useEffect(() => {
        async function getUsers () {
            await axios.get('/users')
            .then((response) => {
                let data = response.data.filter((res, i) => (res.username===username));
                setUserWeights(data.length > 0 ? data[0].weights : []) 
                setStatus("")
            });
        };
        getUsers()
    },[username])

    return (
        <div>
            <h2>User Data for {username}</h2>
            <div>
            <span className="input-group-btn">
           
            </span>
                <div>{status}</div>
                <div><AddNewWeight /></div>
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
}

export default User