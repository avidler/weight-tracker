import React, { useState, useEffect } from 'react'
import axios from 'axios'

function User(props) {
    const username = props.username
    const [userWeights, setUserWeights] = useState([])
    const [status, setStatus] = useState("Loading...")

    
    
    useEffect(() => {
        async function getUsers () {
            await axios.get('/users')
            .then((response) => {
                //console.log(response.data);
                //console.log(response.status);
                //console.log(response.statusText);
                //console.log(response.headers);
                //console.log(response.config);
                let data = response.data.filter((res, i) => (res.username===username));
            
            console.log("Fetched data: ", data)
            console.log("Users weights: ",data[0].weights )
            setUserWeights(data[0].weights)
            setStatus("Loaded")
            
              });
            
        };
        getUsers()
    
        },[username])

    return (
<div>

        <h2>User Data for {username}</h2>
        <div>
    <div>Weights: {status}</div>
    <div className="weightboard">
            <h2>Weight History</h2>
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
        </div>
    </div>
</div>
    )
}

export default User