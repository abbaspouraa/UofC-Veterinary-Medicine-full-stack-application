import React from "react";
import "./AnimalProfilePopup.css"

const AnimalPopup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                {props.content}
            </div>
        </div>
    );
};

export default AnimalPopup;