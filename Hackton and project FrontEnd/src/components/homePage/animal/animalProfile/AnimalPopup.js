import React from "react";
import "./AnimalProfilePopup.css"

const AnimalPopup = props => {
    return (
        <div className="animal-popup-box">
            <div className="animal-box">
                {props.content}
            </div>
        </div>
    );
};

export default AnimalPopup;