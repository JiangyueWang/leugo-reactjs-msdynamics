import React, { useEffect, useState } from 'react';
import { callMsDataverse } from '../../utils/dataverse';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { useMsal, useAccount } from '@azure/msal-react';

const CollectionPage = () => {
    const {instance, accounts} = useMsal();
    const user = useAccount(accounts[0] || {});
    const [data, setData] = useState(null);

    useEffect(() => {
        const tokenRequest = {
            scopes: [`https://${process.env.REACT_APP_AAD_DYNAMICS_ENVIRONMENT}.api.crm.dynamics.com/user_impersonation`],
            account: accounts[0],
          };
        if(user) {
            instance
            .acquireTokenSilent(tokenRequest)
            .then((response) => {
              callMsDataverse(response.accessToken, user.idTokenClaims.oid, 'collection').then(setData);
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                  instance.acquireTokenPopup(tokenRequest)
                  .then((response) => {
                    callMsDataverse(response.accessToken).then((response) => setData(response));
                  });
                }
              }); 
        }   
    }, [instance, accounts])

    return(
        <div>
            <h1> 
                Sets in Collection
            </h1>
            {user&&data ? (data[0].map(set => {
                return (
                    <div>
                        <img src={set.cr8fb_setimageurl} alt="" />
                        <li>{set.cr8fb_name}</li>
                        <li>{set.cr8fb_setnumber}</li>
                    </div>
                    
                    )
            })) : null}
        </div>
    )
}

export default CollectionPage;