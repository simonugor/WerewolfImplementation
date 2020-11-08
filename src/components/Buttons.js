function Buttons(props) {

    function restart(event) {
        props.restartGame(event)
    }

    function showHideLovers(event) {
        if (props.showHide === "show") {
            props.showLovers(event)
        } else if (props.showHide === "hide") {
            props.hideLovers(event)
        }
    }

    function showPotions(event) {
        props.showPotionsPopup(event)
    }

    function handleClick(event) {
        props.click(event)
    }

    function handleClickEdit(event) {
        props.clickEdit(event)
    }

    function handleClickDelete(event) {
        props.clickDelete(event)
    }

    function nextButton(event) {
        if (props.nextFunc === "Start") {
            props.nextClick(event)
        } else if (props.nextFunc === "Cupid") {
            props.loversSelected()
        } else if (props.nextFunc === "Seer") {
            props.seerTurn()
        } else if (props.nextFunc === "Sleepwalk") {
            props.sleepwalk()
        } else if (props.nextFunc === "sleepwalkCheck") {
            props.sleepwalkCheck()
        } else if (props.nextFunc === "Werewolves") {
            props.werewolves()
        } else if (props.nextFunc === "whitewerewolf") {
            props.whiteWerewolf()
        } else if (props.nextFunc === "Witch") {
            props.witch()
        } else if (props.nextFunc === "witchKillHeal") {
            props.witchKillHeal()
        } else if (props.nextFunc === "day") {
            props.day()
        } else if (props.nextFunc === "dayStarts") {
            props.dayStarts()
        } else if (props.nextFunc === "nextNight") {
            props.nextNight()
        } else if (props.nextFunc === "mayor") {
            props.mayor()
        } else if (props.nextFunc === "prepDay") {
            props.prepDay()
        } else if (props.nextFunc === "amor") {
            props.amor()
        } else if (props.nextFunc === "killRandomVillager") {
            props.killRandomVillager()
        }
    }

    return(
        <div>
            <div className="smaller_buttons_div">
                <button className="button" onClick={handleClick}>Add</button>
                <br />
                <button onClick={handleClickEdit} className="button">Edit</button>
                <br />
                <button onClick={handleClickDelete} className="button">Delete</button>
            </div>
            <div className="bigger_buttons_div">
                <button onClick={nextButton} className="bigger_button">Next</button>
                <button onClick={restart} className="bigger_button_narrow">Restart</button>
                <button onClick={showHideLovers} className="button_bottom">Show/Hide lovers</button>
                <button onClick={showPotions} className="button_bottom">Show potions</button>
            </div>
            <div className="image_div">
                <button style={{backgroundImage: props.dayNightImg}} className="round_button"></button>
            </div>
        </div>
    )
}

export default Buttons