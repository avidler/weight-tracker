import React from 'react'
import axios from 'axios'

async function AddNewUser(props) {
    const username = props.username
    console.log("username to add: ", username)
    await axios.post('/users/add', username)
    .then(res => console.log(res.data))


    return(
        <div>
        New User Created
        </div>


    )
}

export default AddNewUser