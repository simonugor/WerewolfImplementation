function Players(props) {

    function playerClick(event) {
        if (props.cupidSelect === "edit") {
            props.handleSelected(event)
        } else if (props.cupidSelect === "cupid") {
            props.selectLovers(event)
        } else if (props.cupidSelect === "seer") {
            props.seerSelect(event)
        } else if (props.cupidSelect === "sleepwalk") {
            props.sleepwalkSelect(event)
        } else if (props.cupidSelect === "none") {
            //pass
        } else if (props.cupidSelect === "revealRoleSleepwalking") {
            props.revealRoleSleepwalking(event)
        } else if (props.cupidSelect === "werewolves") {
            props.werewolvesKill(event)
        } else if (props.cupidSelect === "witchKill") {
            props.witchSelectKill(event)
        } else if (props.cupidSelect === "lynch") {
            props.lynchVillager(event)
        } else if (props.cupidSelect === "WhiteWerewolf") {
            props.WhiteWerewolfKill(event)
        } else if (props.cupidSelect === "mayorSelect") {
            props.mayorSelect(event)
        }
    }

    var players = props.players.map(player => {
        var mayor = ""
        if (player.mayor === true) {
            mayor = "(mayor)"
        } else if (player.mayor === false) {
            mayor = ""
        }
        return (<div key={player.name} className="player_name_role">
            <nobr style={{color: player.style, textDecoration: player.crossed}} onClick={playerClick} className="player_name">{player.name}</nobr>
            <nobr style={{display: props.seeRoles}}> - {player.role + " " + mayor}</nobr>
            </div>)
    })

    function showRoles(event) {
        props.showRoles(event)
    }

    return(
        <div className="players_div">
            <h3 className="players_heading">Players:</h3>
            {players}
            <button className="button_roles" onClick={showRoles}>Show/Hide roles</button>
        </div>
    )
}

export default Players