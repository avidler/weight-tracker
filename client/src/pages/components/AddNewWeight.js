import React, { useState } from 'react'
import axios from 'axios'

function AddNewWeight({username}) {
    const [date, setDate] = useState("")
    const [weight, setWeight] = useState(0)


    function submitWeight() {
    console.log("date: ", date)
    console.log("weight: ", weight)
    setDate(date)
    setWeight(weight)
   
    axios.post('/weights/add', {username:username, date:date, weight:weight})
    .then(res => {console.log(res.data)})
    }


      function handleDateChange(e) {
        const {value} = e.target
        setDate(value)
      }

      function handleWeightChange(e) {
        const {value} = e.target
        setWeight(value)
      }

    return(
        <div>
        <h2>Add New Weight</h2>
        <form onSubmit={submitWeight}>
        <label htmlFor="date">Date
            <input type="date" id="date" value={date} onChange = {handleDateChange} />
        </label>
        <label htmlFor="weight">Weight
            <input type="number" id="weight" value={weight}  onChange = {handleWeightChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>
        </div>


    )
}

export default AddNewWeight