import React from 'react';
import SearchSetInfo from './SearchSetInfo';

const DisplaySearchResults = (props) => {
    return(
        <div>
        { props.searchResult ? 
                props.searchResult.map(result => {
                    return(<SearchSetInfo result={result}/>)
                })
                : null}
        </div>
    )
}

export default DisplaySearchResults;