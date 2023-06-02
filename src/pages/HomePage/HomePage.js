import React, { useEffect, useState } from 'react';
import { loginRequest } from '../../context/authConfig';
import { callMsDataverse } from '../../utils/dataverse';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
//https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
import { useMsal, useAccount } from '@azure/msal-react';

const HomePage = () => {
    const {instance, accounts} = useMsal();
    const user = useAccount(accounts[0] || {});
    const [data, setData] = useState(null);

    useEffect(() => {
        const tokenRequest = {
            scopes: [`https://${process.env.REACT_APP_AAD_DYNAMICS_ENVIRONMENT}.api.crm.dynamics.com/user_impersonation`],
            account: accounts[0],
          };
          instance
            .acquireTokenSilent(tokenRequest)
            .then((response) => {
              callMsDataverse(response.accessToken, user.idTokenClaims.oid).then(setData);
            })
            .catch((error) => {
              if (error instanceof InteractionRequiredAuthError) {
                instance.acquireTokenPopup(tokenRequest)
                .then((response) => {
                  callMsDataverse(response.accessToken).then((response) => setData(response));
                });
              }
            }); 
    }, [instance, accounts])


    return (        
    <div>
        <p>Hello {user.name}</p>
        {data && (
        <div>
          <p>Data:</p>
            {data&&user ? (
                <ul>
                    <li>total number of sets owned: {data[1][0].count}</li>
                    <li>total number of brikes: {data[0][0].partstotal}</li>
                </ul>) : null}
          
          {/* <ul>
            {data.map(item => (
              <li key={item.id}>{item.cr8fb_setnumber} {item.cr8fb_name}</li>
            ))}
          </ul> */}
        </div>
      )}
    </div>)

}
export default HomePage;