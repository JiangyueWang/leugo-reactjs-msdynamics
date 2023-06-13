import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
const UserAuthContext = React.createContext();
export default UserAuthContext;

export function AuthProvider({children}) {
    const {instance, accounts} = useMsal();
    const [user, setUser] = useState(accounts[0] || {});
    const [userToken, setUserToken] = useState('');

    const tokenRequest = {
        scopes: [`https://${process.env.REACT_APP_AAD_DYNAMICS_ENVIRONMENT}.api.crm.dynamics.com/user_impersonation`],
        account: accounts[0],
    };
    
    if(user) {
        instance
        .acquireTokenSilent(tokenRequest)
        .then((response) => {
            setUserToken(response.accessToken);
            setUser(accounts[0]);
        })
        .catch(error => {
            if (error instanceof InteractionRequiredAuthError) {
                instance.acquireTokenPopup(tokenRequest)
                .then((response) => {
                    setUserToken(response.accessToken);
                    setUser(accounts[0]);
                });
                }
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
