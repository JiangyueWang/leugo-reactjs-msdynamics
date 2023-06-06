import axios from 'axios';
/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
export const callMsDataverse = async (accessToken, useroid, page) => {
  let urls; 
  // url to return sets for loggin user
  const url = `${process.env.REACT_APP_DATAVERSE_WEB_END_API}/cr8fb_collections?$filter=_cr8fb_aaduser_value eq '${useroid}'`;
  //sum of all number of parts
  const url1 = `${process.env.REACT_APP_DATAVERSE_WEB_END_API}/cr8fb_collections?$filter=_cr8fb_aaduser_value eq '${useroid}'
                          &$apply=aggregate(cr8fb_numberofparts with sum as partstotal)`;
  const url2 = `${process.env.REACT_APP_DATAVERSE_WEB_END_API}/cr8fb_collections?$filter=_cr8fb_aaduser_value eq '${useroid}'
                          &$apply=aggregate($count as count)`                       
  // // filtered by the user first then groupped by theme then count how many sets in each theme
  // const url2 = `${process.env.REACT_APP_DATAVERSE_WEB_END_API}/cr8fb_collections?$filter=_cr8fb_aaduser_value eq '${useroid}'
  //                         &$apply=groupby((cr8fb_theme), aggregate($count as count))`
  if(page === 'collection') {
    urls = [url]
  } else if (page === 'home') {
    urls = [url1, url2]
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
    'Content-Type': 'application/json',
  };

  console.log('GET Request made to Dataverse at: ' + new Date().toString());

  try {
    const responses = await Promise.all(
      urls.map((url) => axios.get(url, { headers }))
    )
    const data = responses.map((response) => response.data.value);
    console.log(data)
    return data
  } catch (error) {
      console.error('Error fetching tables:', error);
      throw error;
  }

  // try {
  //   const response = await axios.get(url, { headers });
  //   return response.data.value;
  // } catch (error) {
  //     console.error('Error fetching tables:', error);
  //     throw error;
  // }
    
}


export const updateDataDataverse = async (accessToken, setId, date, isoDate) => {

  // update dates to a set
  const url = `${process.env.REACT_APP_DATAVERSE_WEB_END_API}/cr8fb_collections(${setId})`;
  console.log(`url ${url}`);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
    'Content-Type': 'application/json',
  };
  let body = {};
  body[`cr8fb_${date}`] = isoDate;
  console.log(body);
  console.log(`headers ${headers}`)
  console.log('PATCH Request made to Dataverse at: ' + new Date().toString());

  try {
      const response = await axios.patch(url, body, { headers });
      return response;
    } catch (error) {
        console.error('Error fetching tables:', error);
        throw error;
    }
}
