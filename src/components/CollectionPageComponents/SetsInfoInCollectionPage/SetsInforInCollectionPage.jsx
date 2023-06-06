import { React, useState } from "react"
import UpdateDateForm from "../UpdateDateForm/UpdateDateForm";
import dayjs from 'dayjs';

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
                    <p>Purchase date: {dayjs(props.purchaseDate).format('DD/MM/YYYY')}</p>
                    <UpdateDateForm date={`purchasedate`} setId={props.setId}/>
                    <p>Build completion date:{dayjs(props.buildCompletionDate).format('DD/MM/YYYY')}</p>
                    <UpdateDateForm date={`buildcompletiondate`} setId={props.setId}/>
                </div>
            ) : null}
        </div>
    )
}

export default SetsInfoInCollectionPage