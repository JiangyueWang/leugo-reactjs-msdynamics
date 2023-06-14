import {React, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchASetForm = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const handleSearchASet = (event) => {
        event.preventDefault();
        if(searchValue === "") {
            alert("please enter a value to search");
        }
        else {
            navigate( {
                pathname:"/search",
                search: `searchValue=${searchValue}`,
            },);
        }
    }
    return(
        <div>
            <form onSubmit={handleSearchASet}> 
                <input 
                    type="text" 
                    placeholder="search a lego"
                    onChange={(event) => setSearchValue(event.target.value)}></input>
                <button
                    type="submit">search...</button>
            </form>
        </div>
    )
}

export default SearchASetForm;