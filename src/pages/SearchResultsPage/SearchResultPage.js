import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
const SearchResultPage = () => {
    // declare a searchParams state variable to get the value of URL params keys
    const [searchParams] = useSearchParams();
    const searchValue = Object.fromEntries([...searchParams]).searchValue;
    const [searchResult, setSearchResult] = useState(null)

    const FetchResultsFromRebricableApi = async () => {
        // declare the async funtion to fetch data from Rebricble database if the user search by sets' name
        try {
            let response = await axios.get(`https://rebrickable.com/api/v3/lego/sets/?search=${searchValue}`, {
                headers: {
                    Authorization: `key ${process.env.REACT_APP_REBRICKABLE_API_KEY}`,
                },
            });
            setSearchResult(response.data.results);
            } catch (error) {
                console.log(error.response.data);
            }
    }
    useEffect(() => {
        FetchResultsFromRebricableApi();
        console.log(searchResult)
    }, [searchValue])
    return(
        <div>

            searched... {searchValue}
        </div>
    )
}

export default SearchResultPage;