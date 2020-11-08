import React from "react"

function OkPopup(props) {

    function okClick(event) {
        props.okButtonClick(event)
    }

    return(
        <div data-testid="popup" style={{display: props.display}} className="okpopup_div">
            <div className="okpopup">
                <p className="okpopup_text">{props.text}</p>
                <button onClick={okClick} className="popup_button">OK</button>
            </div>
        </div>
    )
}

export default OkPopup