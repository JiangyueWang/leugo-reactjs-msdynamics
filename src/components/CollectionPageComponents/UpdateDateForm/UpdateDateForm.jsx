import {React, useState } from "react";
import dayjs from "dayjs";
import { useMsal, useAccount } from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { updateDataDataverse } from "../../../utils/dataverse";

const UpdateDateForm =  (props) => {
    const [editDateIsClicked, setEditDateIsClicked] = useState(false);
    const [newDate, setNewDate] = useState(null);
    const [newDateSaveIsClicked, setNewDateSaveIsClicked] = useState(false);
    const {instance, accounts} = useMsal();
    const user = useAccount(accounts[0] || {});


    const handleEditDateClick = () => {
        setEditDateIsClicked(!editDateIsClicked);
    }
    const handleSaveUpdateDateClick = () => {
        setNewDateSaveIsClicked(!newDateSaveIsClicked);
    }

    const handleUpdateDatesForm = async (event) => {
        event.preventDefault();
        const isoDate = dayjs(newDate).toISOString();
        const tokenRequest = {
            scopes: [`https://${process.env.REACT_APP_AAD_DYNAMICS_ENVIRONMENT}.api.crm.dynamics.com/user_impersonation`],
            account: accounts[0],
          };

       if(newDateSaveIsClicked&&user) {
        instance
        .acquireTokenSilent(tokenRequest)
        .then((response) => {
            updateDataDataverse(response.accessToken, props.setId, props.date, isoDate)
            .then(response => console.log(response));
        })
        .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
              instance.acquireTokenPopup(tokenRequest)
              .then((response) => {
                updateDataDataverse(response.accessToken).then((response) => console.log(response));
              });
            }
          }); 
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
