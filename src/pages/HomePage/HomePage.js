import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../context/authConfig';

const HomePage = () => {
    const {instance, accounts} = useMsal();
    const [user, setUser] = useState(null);
    console.log(instance)
    console.log(accounts)

    if(accounts.length > 0 && !user) 
    {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        }).then(response => {
            setUser(response.account);
        });
    }

    return (        
    <div>
        <p>Hello {user.name}</p>
    </div>)

}
export default HomePage;