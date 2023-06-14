import axios from 'axios';
import React, { useState, useRef } from 'react';
import useUserAuth from '../../hooks/useUserAuth';
import dayjs from 'dayjs';
const SearchSetInfo = (props) => {
    const [user, token] = useUserAuth();
    const reference = useRef();
    const [addToCollectionBtnIsClicked, setAddToCollectionBtnIsClicked] = useState(false);
    const [formData, setFormData] = useState({});
    const [addToCollectionBtnText, setAddToCollectionBtnText] = useState('add');
    
    const handleAddToCollectionClick = () => {
        setAddToCollectionBtnIsClicked(true);
    }

    const onChangeInput = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]:value})
    }
    const handleAddSetToCollectionSubmission = async (event) => {
        event.preventDefault();
        setAddToCollectionBtnText('adding')
         // get the theme name from the Rebricable api
         try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/themes/${props.result.theme_id}`, {
                headers: {
                    Authorization: `key ${process.env.REACT_APP_REBRICKABLE_API_KEY}`,
                },
            });
            // this response returns the themeName of the set
            reference.current = response.data.name
            } catch (error) {
                console.log(error.response.data);
            }
        const themeName = reference.current;
       
        // get the number of minifigs of the set from the Rebricable api
        try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/${props.result.set_num}/minifigs/`, {
                headers: {
                    Authorization: `key ${process.env.REACT_APP_REBRICKABLE_API_KEY}`,
                },
            });
            // this response returns the number of minifigs of the set
            reference.current = response.data.count;
            } catch (error) {
                console.log(error.response.data);
            }
        const minifigNum = reference.current;
        const setInfo = {
                "cr8fb_name": props.result.name,
                "cr8fb_setnumber": props.result.set_num,
                "cr8fb_releaseyear": props.result.year.toString(),
                "cr8fb_theme": themeName,
                "cr8fb_numberofparts": props.result.num_parts,
                "cr8fb_setimageurl": props.result.set_img_url,
                "cr8fb_purchasedate":  dayjs(formData.purchasedate).toISOString(),
                "cr8fb_buildcompletiondate": dayjs(formData.buildcompletiondate).toISOString(),
                "cr8fb_numberofminifigs": minifigNum,
                "cr8fb_AADUser@odata.bind": `https://org1846e615.api.crm.dynamics.com/api/data/v9.2/aadusers(${user?.idTokenClaims?.oid})`,
            };
            console.log(setInfo)
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Content-Type': 'application/json',
                }; 
                const response = await axios.post('https://org1846e615.api.crm.dynamics.com/api/data/v9.2/cr8fb_collections', setInfo, { headers });
                if(response.status === 204) {
                    setAddToCollectionBtnText('added')
                }
            } catch (error) {
                console.log(error)
            }
        
    }
    return(
        <div>
            {props.result ? 
            ( <div>
                <img src={props.result.set_img_url} />
                <p>{props.result.name}</p>
                <button onClick={handleAddToCollectionClick}>add to your collection</button>
                {addToCollectionBtnIsClicked ? (
                    <form onSubmit={handleAddSetToCollectionSubmission}>
                        <span>purchase date</span><input type='date' onChange={onChangeInput} name='purchasedate'></input>
                        <p></p>
                        <span>build completion date</span><input type='date' onChange={onChangeInput} name='buildcompletiondate'></input>
                        <button type='submit'>{addToCollectionBtnText}</button>
                    </form>
                ) : null}
            </div>
            )
            : null}
        </div>
    )   
}

export default SearchSetInfo;