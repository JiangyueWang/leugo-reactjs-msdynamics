import {React, useState } from "react";


const UpdateDateForm =  (props) => {
    const [editDateIsClicked, setEditDateIsClicked] = useState(false);
    const [newDate, setNewDate] = useState(null);


    const handleEditDateClick = () => {
        setEditDateIsClicked(!editDateIsClicked);
    }

    const handleUpdateDatesForm = (event) => {
        event.preventDefault();
        console.log(newDate)
    }
    return(
        <div>
            <button onClick={handleEditDateClick}>Edit</button>
            {editDateIsClicked ? (
                <form onSubmit={handleUpdateDatesForm}>
                    <input type='date' onChange={(event) => setNewDate(event.target.value)} />
                    <button type='submit'>Save</button>
                </form>    ) : null}
        </div>
    )
}
export default UpdateDateForm;
