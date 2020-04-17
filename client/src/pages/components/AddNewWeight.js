import React from 'react'

function AddNewWeight() {

    function handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        
      }

    return(
        <div>
        <h2>Add New Weight</h2>
        <form>
        <label htmlFor="date">Date
            <input type="date" id="date" onChange = {handleChange} />
        </label>
        <label htmlFor="weight">Weight
            <input type="number" id="weight" onChange = {handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>
        </div>


    )
}

export default AddNewWeight