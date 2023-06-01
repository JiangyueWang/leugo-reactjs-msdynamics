import React, { useState } from 'react';
import { loginRequest } from '../../context/authConfig';

//https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
import { useMsal, useAccount } from '@azure/msal-react';

const HomePage = () => {
    // const {instance, accounts} = useMsal();
    const user = useAccount(accounts[0] || {});

    // if(accounts.length > 0 && !user) 
    // {
    //     instance.acquireTokenSilent({
    //         ...loginRequest,
    //         account: accounts[0],
    //     }).then(response => {
    //         setUser(response.account);
    //     });
    // }
    console.log(user)
    return (        
    <div>
        <p>Hello {user.name}</p>
    </div>)

}
export default HomePage;