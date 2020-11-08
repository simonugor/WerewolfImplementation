function WitchPopUp(props) {

    function skipButton() {
        props.witchSkip()
    }

    function killButton() {
        props.witchKill()
    }

    function healButton() {
        props.witchHeal()
    }

    return(
        <div style={{display: props.display}} className="witch_popup_div">
            <div className="witch_popup">
                <h3 className="witch_popup_heading">Witch decided to:</h3>
                <button onClick={healButton} style={{display: props.healButton}} className="witch_popup_button">Heal</button>
                <button onClick={killButton} style={{display: props.killButton}} className="witch_popup_button">Kill</button>
                <button onClick={skipButton} className="witch_popup_button">Skip</button>
            </div>
        </div>
    )
}

export default WitchPopUp