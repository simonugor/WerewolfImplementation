import {useState} from "react"
import './App.css';
//importing components
import Players from "./components/Players"
import Buttons from "./components/Buttons"
import PopUp from "./components/PopUp"
import Story from "./components/Story"
import WitchPopUp from "./components/WitchPopUp"
import WitchHealPopUp from "./components/WitchHealPopUp"
import OkPopup from "./components/OkPopup"
import Header from "./components/Header"
//importing images
import Night from "./images/night2.png"
import Day from "./images/day.png"

function App() {

  //main div
  const [bg, setBg] = useState("#5387bb")
  const [players, setPlayers] = useState([])
  //popup
  const [popUpVisible, setPopUpVisible] = useState("none")
  const [input, setInput] = useState("")
  const [role, setRole] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState("")
  //players
  const [seeRoles, setSeeRoles] = useState("none")
  const [cupidSelect, setCupidSelect] = useState("edit")
  const [lovers, setLovers] = useState([])
  const [sleepwalking, setSleepwalking] = useState([])
  const [nightCount, setNightCount] = useState(1) //add 1 to this every night
  const [witch, setWitch] = useState({heal: "1", kill: "1"})
  const [killedThisNight, setKilledThisNight] = useState([]) //reset this every night
  const [loverKilled, setLoverKilled] = useState(false)
  //story
  const [storyText, setStoryText] = useState("Preparation phase")
  const [secondaryText, setSecondaryText] = useState("Please add players and select their roles.")
  //buttons
  const [nextFunc, setNextFunc] = useState("Start")
  const [showHide, setShowHide] = useState("show")
  const [dayNightImg, setDayNightImg] = useState(`url(${Day})`)
  //witch popup
  const [witchPopup, setWitchPopup] = useState("none")
  const [witchPopupKill, setWitchPopupKill] = useState("none")
  const [witchPopupHeal, setWitchPopupHeal] = useState("none")
  //witch heal popup
  const [witchHealPopup, setWitchHealPopup] = useState("none")
  //ok popup
  const [okDisplay, setOkDisplay] = useState("none")
  const [okText, setOkText] = useState("Hello World")

  function restartGame(event) {
    event.preventDefault()
    setPlayers(players.map(player => {
      player.name = player.name
      player.role = player.role //set this to "" after the game is finished
      player.style = "black"
      player.lover = false
      player.alive = true
      player.crossed = "none"
      player.mayor = false
      return player
    }))
    setBg("#5387bb")
    setDayNightImg(`url(${Day})`)
    setPopUpVisible("none")
    setInput("")
    setRole("")
    setButtonText("")
    setSelectedPlayer("")
    setCupidSelect("edit")
    setLovers([])
    setSleepwalking([])
    setNightCount(1)
    setWitch({heal: "1", kill: "1"})
    setKilledThisNight([])
    setStoryText("Preparation phase")
    setSecondaryText("Please add players and select their roles.")
    setNextFunc("Start")
    setShowHide("show")
    setWitchPopup("none")
    setWitchPopupKill("none")
    setWitchPopupHeal("none")
    setWitchHealPopup("none")
    setOkDisplay("none")
    setOkText("Hello World")
  }

  //function to launch the next night
  function nextNight() {
    //checking if there are any werewolves still alive etc.
    var werewolvesAlive = 0
    players.map(player => {
      if (player.role === "Werewolf" && player.alive === true) {
        werewolvesAlive += 1
      } else if (player.role === "White Werewolf" && player.alive === true) {
        werewolvesAlive += 1
      }
      return player
    })

    if (werewolvesAlive === 0) {
      setStoryText("Villagers won!")
      setSecondaryText("There is no Werewolf alive")
    } else if (werewolvesAlive !== 0) {
      setStoryText("Night " + nightCount + " begins")
      setSecondaryText("Click next to continue")
      setBg("#5c4b43")
      setDayNightImg(`url(${Night})`)
      setNextFunc("Seer")
    }
  }

  function showPotionsPopup(event) {
    event.preventDefault()
    setOkText("Witch currently has " + witch.heal + " heal potions and " + witch.kill + " kill potions.")
    setOkDisplay("flex")
  }

  function okButtonClick(event) {
    event.preventDefault()
    setOkDisplay("none")
  }

  //function to show lovers
  function showLovers(event) {
    event.preventDefault()
    players.map(player => {
      if (player.lover === true) {
        player.style = "red"
      }
      return player
    })
    setShowHide("hide")
  }

  //function to hide lovers on the same button click
  function hideLovers(event) {
    event.preventDefault()
    players.map(player => {
      if (player.style === "red") {
        player.style = "black"
      }
      return player
    })
    setShowHide("show")
  }

  //function to show roles
  function showRoles(event) {
    event.preventDefault()
    if (seeRoles === "none") {
      setSeeRoles("inline")
    } else {
      setSeeRoles("none")
    }
  }

  function handlePopUpChange(event) {
    setInput(event.target.value)
  }

  function selectPopUpChange(event) {
    setRole(event.target.value)
  }

  function addPlayerPopUp(event) {
    event.preventDefault()
    setInput("")
    setButtonText("Add")
    setPopUpVisible("flex")
  }

  function addPlayer(event) {
    event.preventDefault()
    if (input !== "" && input !== " " && input !== "  ") {
      setPlayers([...players, {name: input, role: role, style: "black", lover: false, alive: true, crossed: "none", mayor: false}])
      setInput("")
    } else {
      setInput("")
      alert("Players name can't be empty")
    }
    
  }

  function cancelPopUp(event) {
    event.preventDefault()
    setPopUpVisible("none")
  }

  function handleSelected(event) {
    var selected = event.target.innerHTML
    setPlayers(players.map(player => {
      if (player.name === selected) {
        player.style = "white"  //this means player is selected
      } else {
        player.style = "black" //this means player is not selected
      }
      return player
    }))
  }

  function clickEdit(event) {
    event.preventDefault()
    setButtonText("Edit")
    var selected_name = ""
    var selected_role = ""
    players.map(player => {
      if (player.style === "white") {
        selected_name = player.name
        selected_role = player.role
      }
      return player
    })
    if (selected_name.length !== 0) {
      setSelectedPlayer(selected_name)
      setInput(selected_name)
      setRole(selected_role)
      setPopUpVisible("flex")
    } else {
      alert("Please click on the name of player you would like to edit.")
    }

  }

  function handleEdit(event) {
    event.preventDefault()
    setPlayers(players.map(player => {
      if (selectedPlayer === player.name) {
        player.name = input
        player.role = role
        player.style = "black"
      }
      return player
    }))
    setPopUpVisible("none")
  }

  //function to delete player
  function handleDelete(event) {
    event.preventDefault()
    setPlayers(players.map(player => {
      if (player.style === "white") {
        player.name = ""
        player.role = ""
      }
      return player
    }))
  }

  //function to check if everything is correct before starting the game
  function nextClick(event) {
    event.preventDefault()
    var villagers = 0
    var werevolwes = 0
    var witch = 0
    var mayor = 0
    var hunter = 0
    var amor = 0
    var seer = 0
    players.map(player => {
      if (player.role === "Villager") {
        villagers += 1
      } else if (player.role === "Werewolf") {
        werevolwes +=1
      } else if (player.role === "Witch") {
        witch += 1
      } else if (player.role === "Mayor") {
        mayor += 1
      } else if (player.role === "Hunter") {
        hunter += 1
      } else if (player.role === "Amor") {
        amor += 1
      } else if (player.role === "Seer") {
        seer += 1
      } else if (player.role === "White Werewolf") {
        werevolwes += 1
      }
      return player
    })
    //do the checking here if (sum of all < minimum players)... not good
    var players_count = villagers + werevolwes + witch + mayor + hunter + amor + seer
    if (players_count < 6) {
      alert("There has to be minimum 6 players.")
    } else {
      //add some more checking and launch the game (at least two werewolves...)
      if (seer === 1) {
        if (werevolwes === 3) {
          if (witch === 1) {
              if (hunter === 1) {
                if (amor === 1) {
                  if (villagers >= 3) {
                    setPlayers(players.map(player => {
                      player.style = "black"
                      return player
                    }))
                    firstNight() //launch the game here
                  } else {
                    alert("You must have at least 3 villagers")
                  }
                } else if (amor < 1) {
                  alert("You must choose one amor")
                } else if (amor > 1) {
                  alert("You can have maximum one amor")
                }
              } else if (hunter < 1) {
                alert("You must choose one hunter")
              } else if (hunter > 1) {
                alert("You can have maximum one hunter")
              }
          } else if (witch < 1) {
            alert("You must choose one witch")
          } else if ( witch > 1) {
            alert("You can have maximum 1 witch")
          }
        } else if (werevolwes > 3) {
          alert("You can have maximum 2 werewolves")
        }
      } else if (seer > 1) {
        alert("You can have maximum 1 seer")
      } else if (seer < 1) {
        alert("You must choose one seer")
      }
    }
  }

  function firstNight() {
    setBg("#5c4b43")
    setDayNightImg(`url(${Night})`)
    setNextFunc("amor")
    players.map(player => {
      player.style = "black"
      return player
    })
    setStoryText("Everyone goes to sleep")
    setSecondaryText("Click next to continue")
  }

  //beginning of amors turn
  function amor() {
    players.map(player => {
      player.style = "black"
      return player
    })
    setCupidSelect("cupid")
    setNextFunc("Cupid")
    setStoryText("Cupid wakes up and chooses lovers")
    setSecondaryText("Please click on two players on the left you want to be in love and click next")
  }

  //amor selecting the lovers function
  function selectLovers(event) {
    var selected = event.target.innerHTML
    console.log(lovers.length)
    if (lovers.length <= 1) {
      setPlayers(players.map(player => {
        if (player.name === selected) {
          if (player.role !== "Amor") {
            player.style = "red"  //this means player is lover
            player.lover = true
            setLovers([...lovers, player.name])
            } else {
              alert("Amor can't be a lover!")
            } 
          }
          return player
        })) 
    } else {
      alert("you can only have 2 lovers") //better checking here!
    }
  }

  function loversSelected() {
    setNextFunc("prepDay")
    setStoryText("Lovers were selected - two lovers raise their heads to see each other")
    setSecondaryText("Click the next button to continue")
  }

  function prepDay() {
    setBg("#5387bb")
    setDayNightImg(`url(${Day})`)
    players.map(player => {
      player.style = "black"
      return player
    })
    setStoryText("Everyone wakes up")
    setSecondaryText("Click next to continue")
    setNextFunc("mayor")
  }

  function mayor() {
    players.map(player => {
      player.style = "black"
      return player
    })
    setStoryText("Players voting for mayor")
    setSecondaryText("Click on name of player, players voted to be a mayor")
    setCupidSelect("mayorSelect")
  }

  function mayorSelect(event) {
    var selected = event.target.innerHTML
    players.map(player => {
      if (player.name === selected) {
        player.mayor = true
        setStoryText(player.name + " is a mayor.")
        setSecondaryText("Click next to continue")
      }
      return player
    })
    setNextFunc("nextNight")
  }

  function seerTurn() {
    setCupidSelect("edit")
    players.map(player => {
      player.style = "black"
      return player
    })
    players.map(player => {
      if (player.role === "Seer" && player.alive === true) {
        setStoryText("Seer wakes up and gets to see real identity of one player")
        setSecondaryText("Click the name of player Seer decided to reveal")
        setCupidSelect("seer")
      } else if (player.role ==="Seer" && player.alive === false) {
        setStoryText("Seer was killed already")
        setSecondaryText("Click the next button to continue")
        setNextFunc("Sleepwalk")
      }
      return player
    })
  }

  function seerSelect(event) {
    var selected = event.target.innerHTML
    players.map(player => {
      if (player.name === selected && player.role !== "Seer") {
        setStoryText(player.name + " is " + player.role)
        setSecondaryText("Click next to continue")
        setCupidSelect("none")
        setNextFunc("Sleepwalk")
      } else if (player.name === selected && player.role === "Seer") {
        alert("Seer already knows his role. Select different player")
      }
      return player
    })
  }

  function sleepwalk() {
    setStoryText("Villagers are asked who wants to sleepwalk")
    setSecondaryText("Click names of villagers to select them as sleepwalking and click next")
    setCupidSelect("sleepwalk")
  }

  function sleepwalkSelect(event) {
    var selected = event.target.innerHTML
    players.map(player => {
      if (player.name === selected && player.role === "Villager" && player.alive === true) {
        player.style = "white"
        setSleepwalking([...sleepwalking, player.name])
        setNextFunc("sleepwalkCheck")
      } else if (player.name === selected && player.role !== "Villager") {
        alert("You can only select villagers to go sleepwalking")
      } else if (player.name === selected && player.alive === false) {
        alert("Only players alive can go sleepwaking")
      }
      return player
    })
  }

  function sleepwalkCheck() {
    var villagersCount = 0
    players.map(player => {
      if (player.role === "Villager") {
        villagersCount += 1
      }
      return player
    })
    if (villagersCount === sleepwalking.length) { //not done!
      setStoryText("All villagers decided to go sleep wakling")
      setSecondaryText("One villager will be killed randomly, click next")
      setCupidSelect("none")
      setNextFunc("killRandomVillager")
    } else if (sleepwalking.length === 1) { //done
      setStoryText("One villager decided to go sleepwalking")
      setSecondaryText("Click on the player to reveal his role")
      setCupidSelect("revealRoleSleepwalking")
      players.map(player => {
        player.style = "black"
        return player
      })
    } else if (sleepwalking.length !== 1 && villagersCount !== sleepwalking.length) { //done
      setStoryText("Not all or none but not one wants to go.")
      setSecondaryText("Click next to continue")
      setCupidSelect("none")
      setNextFunc("Werewolves")
    }
  }

  function killRandomVillager() {
    var allVillagersAlive = []
    players.map(player => {
      if (player.role === "Villager" && player.alive === true) {
        allVillagersAlive.push(player.name)
      }
      return player
    })
    setPlayers(players.map(player => {
      if (player.name === allVillagersAlive[0]) {
        setStoryText(player.name + " was killed")
        setSecondaryText("Click next to continue")
        player.alive = false
        player.crossed = "line-through"
        setKilledThisNight([...killedThisNight, player.name])
        setNextFunc("Werewolves")
      }
      return player
    }))
  }

  function revealRoleSleepwalking(event) {
    var selected = event.target.innerHTML
    players.map(player => {
      if (player.name === selected) {
        setStoryText(player.name + " is " + player.role)
        setSecondaryText("Click next to continue")
        setNextFunc("Werewolves")
      }
      return player
    })
  }

  function werewolves() {
    setStoryText("Werewolves wake up and vote to kill")
    setSecondaryText("Click name of a player that werewolves decided to kill")
    setCupidSelect("werewolves")
    players.map(player => {
      player.style = "black"
      return player
    })
  }

  function werewolvesKill(event) {
    var selected = event.target.innerHTML
    players.map(player => {
      if (player.name === selected && player.alive === true && player.lover === true) {
        setLoverKilled(true)
        setStoryText(player.name + " was killed")
        setSecondaryText("Click next to continue")
        player.alive = false
        player.crossed = "line-through"
        setKilledThisNight([...killedThisNight, player.name])
        setNextFunc("whitewerewolf")
      } else if (player.name === selected && player.alive === true && player.lover === false) {
        setLoverKilled(false)
        setStoryText(player.name + " was killed")
        setSecondaryText("Click next to continue")
        player.alive = false
        player.crossed = "line-through"
        setKilledThisNight([...killedThisNight, player.name])
        setNextFunc("whitewerewolf")
      } else if (player.name === selected && player.alive === false) {
        alert("This player is already dead!")
      }
      return player
    })
  }

  function whiteWerewolf() {

    var whiteWerewolfAlive

    players.map(player => {
      if (player.role === "White Werewolf") {
        whiteWerewolfAlive = player.alive
      }
      return player
    })

    if (nightCount % 2 === 0 && whiteWerewolfAlive === true) {
      setStoryText("Even Night - White Werewolf choses to kill")
      setSecondaryText("Click name of a player that white werewolf decided to kill")
      setCupidSelect("WhiteWerewolf")
    } else if (nightCount % 2 !== 0) {
      setStoryText("Odd Night - White Werewolf is skipped")
      setSecondaryText("Click next to continue")
      setNextFunc("Witch")
    } else if (whiteWerewolfAlive === false) {
      setStoryText("White Werewolf is already dead")
      setSecondaryText("Click next to continue")
      setNextFunc("Witch")
    }
  }

  function WhiteWerewolfKill(event) {
    //set the nextFunc
    var selected = event.target.innerHTML
    players.map(player => {
      if (player.name === selected && player.alive === true && player.role === "Werewolf") {
        setStoryText(player.name + " was killed by White Werewolf")
        setSecondaryText("Click next to continue")
        player.alive = false
        player.crossed = "line-through"
        setNextFunc("Witch")
        //add checking if player is a lover or hunter
      } else if (player.name === selected && player.role === "White Werewolf") {
        alert("White Werewolf can't kill himself")
      } else if (player.name === selected && player.alive === false) {
        alert("This player is already dead")
      } else if (player.name === selected && player.role !== "Werewolf") {
        alert("White Werewolf can only kill Werewolves")
      }
      return player
    })
  }

  function witch_turn() {
    //check if witch is alive
    var healPotion = witch.heal
    var killPotion = witch.kill
    setStoryText("Witch has " + healPotion + " heal potion and " + killPotion + " kill potion")
    setSecondaryText("Click next to select if she decided to kill or heal or nothing")
    setNextFunc("witchKillHeal")
  }

  function witchKillHeal() {
    if (witch.heal === "1" && witch.kill === "1") {
      setWitchPopupHeal("initial")
      setWitchPopupKill("initial")
    } else if (witch.heal === "1" && witch.kill !== "1") {
      setWitchPopupHeal("initial")
      setWitchPopupKill("none")
    } else if (witch.kill === "1" && witch.heal !== "1") {
      setWitchPopupHeal("none")
      setWitchPopupKill("initial")
    } else if (witch.kill !== "1" && witch.heal !== "1") {
      setWitchPopupHeal("none")
      setWitchPopupKill("none")
    }
    setWitchPopup("flex")
  }

  function witchHeal() {
    setWitchHealPopup("flex")
  }

  function healPlayer(player) {
    //set witch heal potion to -1
    players.map(p => {
      if (p.name === player) {
        p.alive = true
        p.style = "black"
        p.crossed = "none"
        setStoryText(p.name + " was healed by witch")
        setSecondaryText("Click next to continue")
        setNextFunc("day")
        setWitchHealPopup("none")
        setWitchPopup("none")
        setWitch({heal:"0", kill: witch.kill})
      }
      return player
    })
  }

  function witchKill() {
    setWitchPopup("none")
    setStoryText("Witch decided to use her kill potion")
    setSecondaryText("Click name of the player witch decided to kill")
    setCupidSelect("witchKill")
  }

  function witchSelectKill(event) {
    //set witch kill potion -1
    var selected = event.target.innerHTML
    players.map(player => {
      if (player.name === selected && player.alive === true && player.role !== "Witch") {
        setStoryText(player.name + " was killed by witch")
        setSecondaryText("Click next to continue")
        player.alive = false
        player.crossed = "line-through"
        setNextFunc("day")
        setWitch({heal: witch.heal, kill: "0"})
        //add checking if player is a lover or hunter
      } else if (player.name === selected && player.alive === false) {
        alert("This player is already dead!")
      } else if (player.name === selected && player.role === "Witch") {
        alert("Witch can kill herself!")
      }
      return player
    })
  }

  function witchSkip() {
    setStoryText("Witch decided not to throw any potion")
    setSecondaryText("Click next to continue")
    setWitchPopup("none")
    setNextFunc("day")
    //end of night
  }

  //beginning of the day
  function day() {
    //checking if any villagers are still alive etc.
    var villagersAlive = 0
    players.map(player => {
      if (player.role === "Villager" && player.alive === true) {
        villagersAlive += 1
      }
      return player
    })

    if (villagersAlive === 0) {
      setStoryText("Werewolves won!")
      setSecondaryText("There is no villager alive")
    } else if (villagersAlive !== 0 && loverKilled === false) {
      //restart every state needed to be restarted or added to
      setBg("#5387bb")
      setDayNightImg(`url(${Day})`)
      setKilledThisNight([])
      setSleepwalking([])
      setNightCount(nightCount+1) //does this work? - yes it does :)
      setStoryText("Night is over. Day starts.")
      setSecondaryText("Click next to continue")
      setNextFunc("dayStarts")
    } else if (villagersAlive !== 0 && loverKilled === true) {
      setStoryText("Lover was killed - second lover dies too")
      setSecondaryText("Click next to continue")
      setBg("#5387bb")
      setDayNightImg(`url(${Day})`)
      players.map(player => {
        if (player.lover === true) {
          player.alive = false
          player.crossed = "line-through"
          setLoverKilled(false)
          setNextFunc("day")
        }
        return player
      })
    }
  }

  function dayStarts() {
    setStoryText("Villagers voting who to lynch")
    setSecondaryText("Click name of the player they decided to lynch")
    setCupidSelect("lynch")
  }

  function lynchVillager(event) {
    var selected = event.target.innerHTML
    players.map(player => {
      if (player.name === selected && player.alive === true) {
        setStoryText(player.name + " was lynched.")
        setSecondaryText("Click next to continue")
        player.alive = false
        player.crossed = "line-through"
        setNextFunc("nextNight")
        //add checking if player is a lover or hunter
      } else if (player.name === selected && player.alive === false) {
        alert("This player is already dead!")
      }
      return player
    })
  }

  return (
    <div className="main_div" style={{background: bg}}>
      <Header />
      <PopUp edit={handleEdit} buttonText={buttonText} role={role} input={input} selectPopUpChange={selectPopUpChange} handlePopUpChange={handlePopUpChange} addPlayer={addPlayer} cancelPopUp={cancelPopUp} display={popUpVisible} />
      <WitchPopUp 
      witchHeal={witchHeal}
      witchKill={witchKill}
      killButton={witchPopupKill}
      healButton={witchPopupHeal}
      display={witchPopup}
      witchSkip={witchSkip}
      />
      <WitchHealPopUp healPlayer={healPlayer} killed={killedThisNight} witchHealPopup={witchHealPopup} />
      <OkPopup okButtonClick={okButtonClick} display={okDisplay} text={okText} />
      <div className="div_left">
        <Players
        mayorSelect={mayorSelect}
        WhiteWerewolfKill={WhiteWerewolfKill}
        lynchVillager={lynchVillager}
        witchSelectKill={witchSelectKill}
        werewolvesKill={werewolvesKill}
        revealRoleSleepwalking={revealRoleSleepwalking}
        sleepwalkSelect={sleepwalkSelect}
        seerSelect={seerSelect} 
        selectLovers={selectLovers} 
        cupidSelect={cupidSelect} 
        showRoles={showRoles} seeRoles={seeRoles} 
        handleSelected={handleSelected} 
        players={players} />
      </div>
      <div className="div_right">
        <div className="div_top_right">
          <Buttons
          dayNightImg={dayNightImg}
          killRandomVillager={killRandomVillager}
          amor={amor}
          prepDay={prepDay}
          mayor={mayor}
          restartGame={restartGame}
          nextNight={nextNight}
          showPotionsPopup={showPotionsPopup}
          showLovers={showLovers}
          hideLovers={hideLovers}
          showHide={showHide}
          dayStarts={dayStarts}
          day={day}
          witchKillHeal={witchKillHeal}
          witch={witch_turn}
          whiteWerewolf={whiteWerewolf}
          nextFunc={nextFunc}
          werewolves={werewolves}
          sleepwalkCheck={sleepwalkCheck}
          sleepwalk={sleepwalk}
          seerTurn={seerTurn}
          loversSelected={loversSelected}
          clickDelete={handleDelete}
          clickEdit={clickEdit}
          click={addPlayerPopUp} 
          nextClick={nextClick}
          />
        </div>
        <div className="div_bottom_right">
          <Story secondaryText={secondaryText} storyText={storyText} />
        </div>
      </div>
    </div>
  )
}

export default App;
