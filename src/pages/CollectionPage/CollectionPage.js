import React, { useEffect, useState } from 'react';
import { callMsDataverse } from '../../utils/dataverse';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { useMsal, useAccount } from '@azure/msal-react';
import SetsInfoInCollectionPage from '../../components/CollectionPageComponents/SetsInfoInCollectionPage/SetsInforInCollectionPage';

const CollectionPage = () => {
    const {instance, accounts} = useMsal();
    const user = useAccount(accounts[0] || {});
    const [data, setData] = useState('');
    const [userToken, setUserToken] = useState('')
    
    const fetechDataInCollectionTable = () => {
      const tokenRequest = {
        scopes: [`https://${process.env.REACT_APP_AAD_DYNAMICS_ENVIRONMENT}.api.crm.dynamics.com/user_impersonation`],
        account: accounts[0],
      };
      if(user) {
        instance
        .acquireTokenSilent(tokenRequest)
        .then((response) => {
          setUserToken(response.accessToken);
          callMsDataverse(response.accessToken, user.idTokenClaims.oid, 'collection')
          .then((data) => {
              setData(data);

            });
        })
        .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
              instance.acquireTokenPopup(tokenRequest)
              .then((response) => {
                callMsDataverse(response.accessToken, user.idTokenClaims.oid, 'collection')
                .then((data) => setData(data));
              });
            }
          }); 
      }  
      }
    useEffect(() => {
      fetechDataInCollectionTable();
    }, [instance, accounts,])
    return(
        <div>
            <h1> 
                Sets in Collection
            </h1>
            {data ? (data[0].map(set => {
                return (
                    <SetsInfoInCollectionPage 
                        setData = {setData}
                        userToken = {userToken}
                        user = {user}
                        img = {set.cr8fb_setimageurl}
                        setName = {set.cr8fb_name}
                        setNumber = {set.cr8fb_setnumber}  
                        releaseYear = {set.cr8fb_releaseyear}
                        theme = {set.cr8fb_theme}
                        purchaseDate = {set.cr8fb_purchasedate}
                        buildCompletionDate = {set.cr8fb_buildcompletiondate}
                        setId = {set.cr8fb_collectionid}
                        fetechDataInCollectionTable = {fetechDataInCollectionTable}
                        />
                    )
            })) : null}
        </div>
    )
}

export default CollectionPage;