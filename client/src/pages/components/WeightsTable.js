import React from 'react'

function WeightsTable({userWeights}) {
    //const userWeights = props.userWeights
    console.log("userWeights: ",userWeights)
    return(
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


    )
}

export default WeightsTable