import { React, useState } from "react"
import UpdateDateForm from "../UpdateDateForm/UpdateDateForm";
// import UpdateDatesForm from "../UpdateDatesForm/UpdateDatesForm";

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
                    <UpdateDateForm date={`purchasedate`} />
                    <p>Build completion date:{props.buildCompletionDate}</p>
                    <UpdateDateForm date={`buildcompletiondate`} />
                </div>
            ) : null}
        </div>
    )
}

export default SetsInfoInCollectionPage