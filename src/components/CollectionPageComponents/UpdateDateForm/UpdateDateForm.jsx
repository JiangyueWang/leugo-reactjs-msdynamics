import {React, useState } from "react";
import dayjs from "dayjs";
import { updateDataDataverse } from "../../../utils/dataverse";
import useUserAuth from '../../../hooks/useUserAuth';

const UpdateDateForm =  (props) => {
    // initiated state variables in this componenet
    const [editDateIsClicked, setEditDateIsClicked] = useState(false);
    const [newDate, setNewDate] = useState("");
    const [newDateSaveIsClicked, setNewDateSaveIsClicked] = useState(false);
    const [saveDateButtonText, setSaveDateButtonText] = useState('Save')
    const [user, token] = useUserAuth();
    
    
    // toggles the value of editDateIsClicked
    const handleEditDateClick = () => {
        setEditDateIsClicked(!editDateIsClicked);
    }
    // detects the user clicks save button
    const handleSaveUpdateDateClick = () => {
        setNewDateSaveIsClicked(true);
    }

    const handleUpdateDatesForm = (event) => {
        event.preventDefault();
        if(newDate !== dayjs(props.oldDate).format('YYYY-MM-DD')) {
            const isoDate = dayjs(newDate).toISOString();
            if(newDateSaveIsClicked) {
                setSaveDateButtonText('saving');
                //updating the new dates in the Dataverse collection table
                updateDataDataverse(token, props.setId, props.date, isoDate)
                .then(() => {
                    props.fetechDataInCollectionTable();
                    setSaveDateButtonText('saved')
                })
                .catch(error => {
                throw error;
                })
           }
        } else {
            alert('you selected the same date')
        }

    
    }
    return(
        <div>
            <button onClick={handleEditDateClick}>Edit</button>
            {editDateIsClicked ? (
                <form onSubmit={handleUpdateDatesForm}>
                    <input type='date' onChange={(event) => setNewDate(event.target.value)} />
                    <button type='submit' onClick={handleSaveUpdateDateClick}>{saveDateButtonText}</button>
                </form>    ) : null}
        </div>
    )
}
export default UpdateDateForm;
