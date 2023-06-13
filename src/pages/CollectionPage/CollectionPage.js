import React, { useEffect, useState } from 'react';
import { callMsDataverse } from '../../utils/dataverse';
import SetsInfoInCollectionPage from '../../components/CollectionPageComponents/SetsInfoInCollectionPage/SetsInforInCollectionPage';
import useUserAuth from '../../hooks/useUserAuth';

const CollectionPage = () => {
    const [data, setData] = useState('');
    const [user, token] = useUserAuth();
    
    const fetechDataInCollectionTable = () => {
      if(user&&token) {
        callMsDataverse(token, user?.idTokenClaims?.oid, 'collection')
        .then(data => setData(data));
      }
    }
    useEffect(() => {
      fetechDataInCollectionTable();
    }, [user, token])
    return(
        <div>
            <h1> 
                Sets in Collection
            </h1>
            {data ? (data[0].map(set => {
                return (
                    <SetsInfoInCollectionPage 
                        setData = {setData}
                        // userToken = {userToken}
                        // user = {user}
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