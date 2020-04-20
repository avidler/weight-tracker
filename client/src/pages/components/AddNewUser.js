import React from 'react'
import axios from 'axios'

function AddNewUser(props) {
    const username = props.username
    
    axios.post('/users/add', {username:username})
    .then(res => console.log(res.data))
}

    return(
        <div>
        New User Created
        </div>


    )


export default AddNewUser