import React, { useState } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';

const UserAuthContext = React.createContext();
export default UserAuthContext;

export function AuthProvider({children}) {
    const {instance, accounts} = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [user, setUser] = useState({});
    const [userToken, setUserToken] = useState('');

    const tokenRequest = {
        scopes: [`https://${process.env.REACT_APP_AAD_DYNAMICS_ENVIRONMENT}.api.crm.dynamics.com/user_impersonation`],
        account: accounts[0],
    };
    
    if(isAuthenticated) {
        instance
        .acquireTokenSilent(tokenRequest)
        .then((response) => {
            setUserToken(response.accessToken);
            setUser(accounts[0]);
        })
        .catch(error => {
            console.log(error)
        })
    }
    const contextData = {
        user, 
        userToken
    }
    return(
        <>
            <UserAuthContext.Provider value={contextData}>
            {children}
            </UserAuthContext.Provider>
        </>
    )
}
