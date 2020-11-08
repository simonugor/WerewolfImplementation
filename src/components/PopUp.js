function PopUp(props) {

    function handleInputChange(event) {
        props.handlePopUpChange(event)
    }

    function selectChange(event) {
        props.selectPopUpChange(event)
    }

    function addPlayerInPopUp(event) {
        if (props.buttonText === "Add") {
            props.addPlayer(event)
        } else if (props.buttonText === "Edit") {
            props.edit(event)
        }
    }

    function callCancel(event) {
        props.cancelPopUp(event)
    }

    return(
        <div style={{display: props.display}} className="popup_div">
            <div className="popup">
                <form>
                    <label className="form_label">Add a player:</label>
                    <br />
                    <input className="input_box" onChange={handleInputChange} type="textbox" value={props.input} placeholder="Name"></input>
                    <br />
                    <select onChange={selectChange} value={props.role} className="select_box">
                        <option style={{display: "none"}}>Select a role</option>
                        <option>Villager</option>
                        <option>Werewolf</option>
                        <option>White Werewolf</option>
                        <option>Witch</option>
                        <option>Hunter</option>
                        <option>Seer</option>
                        <option>Amor</option>
                    </select>
                    <br />
                    <button className="popup_button" onClick={addPlayerInPopUp}>{props.buttonText}</button>
                    <button className="popup_button" onClick={callCancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default PopUp