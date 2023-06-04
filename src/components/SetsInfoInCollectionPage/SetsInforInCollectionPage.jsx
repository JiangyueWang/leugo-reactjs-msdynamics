import { React, useState } from "react"

const SetsInfoInCollectionPage = (props) => {
    const [viewDetailBtnClick, setViewDetailedBtnClick] = useState(false);
    const handleViewDetailsBtnClick = () => {
        setViewDetailedBtnClick(!viewDetailBtnClick);
        
    }
    return(
        <div>
            <img src={props.img} alt=""/>
            <p>{props.setName}</p>
            <p>Item number: {props.setNumber}</p>
            <button onClick={handleViewDetailsBtnClick}> view details</button>
            {viewDetailBtnClick ? (
                <div>
                    <p>Release year: {props.releaseYear}</p>
                    <p>Theme: {props.theme}</p>
                    <p>Purchase date: {props.purchaseDate}</p>
                    <p>Build completion date:{props.buildCompletionDate}</p>
                </div>
            ) : null}
        </div>
    )
}

export default SetsInfoInCollectionPage