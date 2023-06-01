import axios from 'axios';
/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
export const callMsDataverse = async (accessToken, useroid) => {
  // url to return sets for loggin user
  const url = `${process.env.REACT_APP_DATAVERSE_WEB_END_API}/cr8fb_collections?$filter=_cr8fb_aaduser_value eq '${useroid}'`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
    'Content-Type': 'application/json',
  };

  console.log('GET Request made to Dataverse at: ' + new Date().toString());

  try {
    const response = await axios.get(url, { headers });
    return response.data.value;
  } catch (error) {
      console.error('Error fetching tables:', error);
      throw error;
}
    
}
