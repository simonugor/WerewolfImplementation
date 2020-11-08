import { useState } from "react"

function WitchHealPopUp(props) {

    const [selected, setSelected] = useState("")

    function onChange(event) {
        setSelected(event.target.value)
    }

    function callHeal() {
        if (selected !== "") {
            props.healPlayer(selected)
        } else if (selected === "") {
            alert("Please select who to heal")
        }
    }

    var options = props.killed.map(player => {
        return(<option>{player}</option>)
    })

    return(
        <div style={{display: props.witchHealPopup}} className="witch_heal_div">
            <div className="witch_heal">
                <h3 className="heal_header">Who did Witch decided to heal?</h3>
                <select onChange={onChange} value={selected} className="select_box">
                    <option style={{display: "none"}}>Select who to heal</option>
                    {options}
                </select>
                <br />
                <button onClick={callHeal} className="popup_button">Heal</button>
            </div>
        </div>
    )
}

export default WitchHealPopUp