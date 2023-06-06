import {React, useEffect, useState } from "react";
import dayjs from "dayjs";
import { callMsDataverse } from '../../../utils/dataverse';
import { updateDataDataverse } from "../../../utils/dataverse";

const UpdateDateForm =  (props) => {
    const [editDateIsClicked, setEditDateIsClicked] = useState(false);
    const [newDate, setNewDate] = useState("");
    const [newDateSaveIsClicked, setNewDateSaveIsClicked] = useState(false);

    const handleEditDateClick = () => {
        setEditDateIsClicked(!editDateIsClicked);
    }
    const handleSaveUpdateDateClick = () => {
        setNewDateSaveIsClicked(true);
    }

    const handleUpdateDatesForm = (event) => {
        event.preventDefault();
        const isoDate = dayjs(newDate).toISOString();
        if(newDateSaveIsClicked) {
            updateDataDataverse(props.userToken, props.setId, props.date, isoDate)
            .then(() => {
                callMsDataverse(props.userToken, props.user.idTokenClaims.oid, 'collection')
                .then((data) => {
                props.setData(data)})
            })
            .catch(error => {
            throw error;
            })
       }
    
    }
    return(
        <div>
            <button onClick={handleEditDateClick}>Edit</button>
            {editDateIsClicked ? (
                <form onSubmit={handleUpdateDatesForm}>
                    <input type='date' onChange={(event) => setNewDate(event.target.value)} />
                    <button type='submit' onClick={handleSaveUpdateDateClick}>Save</button>
                </form>    ) : null}
        </div>
    )
}
export default UpdateDateForm;
