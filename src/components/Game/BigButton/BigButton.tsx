import { useContext } from "react"
import { GameContext } from "../../../contexts/GameContext"
import { TIMER_LENGTH } from "../../../data/consts"
import { classNames } from "../../../utils/classNames"
import { checkPlayedByBoth } from "../../../utils/gameUtils"
import { getRandomNumber } from "../../../utils/getRandomNumber"
import styles from "./BigButton.module.scss"

function BigButton() {
  const {
    game: { turn, level, timer, board },
    turnPlayed,
    resettingGame,
    setResettingGame,
    nextTurn,
    nextLevel,
    updateTimer,
    setTurnPlayed,
    setResults,
    resetGame,
  } = useContext(GameContext)

  const buttonStartDisabled = classNames(
    styles["button-start"],
    !(turn.player === null) && styles["button--disabled"]
  )

  const buttonReadyDisabled = classNames(
    styles["button-ready"],
    (!turnPlayed || !(timer.time >= 1)) && styles["button--disabled"]
  )

  const buttonReadyLabel = turnPlayed && timer.time >= 1 ? "Ready" : ""

  const buttonResetDisabled = classNames(
    styles["button-reset"],
    resettingGame && styles["button--disabled"]
  )

  const handleClickStart = () => {
    const player = getRandomNumber(1, 2) === 1 ? "P1" : "P2"
    nextTurn({ player })

    setTimeout(() => {
      nextTurn({ playing: player }) //change color

      setTimeout(() => {
        nextLevel(true) //change spawner mode

        setTimeout(() => {
          updateTimer({ interval: true })
        }, 600) //wait for rotatin_in of spawner-container
      }, 1600) //wait for dice_rolling_out of spawner-container
    }, 3400) //wait for dice_rolling_in of spawner-container
  }

  const handleClickReady = () => {
    if (level >= 8 && checkPlayedByBoth(board, level)) {
      nextTurn({})
      updateTimer({ time: 0, interval: false })

      setTimeout(() => {
        nextLevel()
        nextTurn({ player: null, playing: null })
        setTurnPlayed(false)
        setResults()

        setTimeout(() => {
          nextLevel(true)
        }, 1600)
      }, 600)
    } else {
      nextTurn({})
      updateTimer({ time: 0, interval: false })

      setTimeout(() => {
        nextLevel()
        nextTurn({ playing: "same" })
        setTurnPlayed(false)
        updateTimer({ time: TIMER_LENGTH })

        setTimeout(() => {
          updateTimer({ interval: true })
        }, 600) //wait for open_pawn_container of pawn-container
      }, 600) //wait for rotatin_out of spawner-container
    }
  }

  const handleClickReset = () => {
    setResettingGame((prev) => !prev)

    setTimeout(() => {
      resetGame()
      setResettingGame((prev) => !prev)
    }, 2000)
  }

  const bigButtonClass = classNames(
    styles["big-button"],
    turn.player && styles[`player-${turn.player}`],
    turn.playing && styles[`playing-${turn.playing}`],
    resettingGame && styles.resetting
  )

  return (
    <div className={bigButtonClass}>
      {level === 0 && (
        <button className={buttonStartDisabled} onClick={handleClickStart}>
          Start
        </button>
      )}

      {level > 0 && level <= 8 && (
        <button className={buttonReadyDisabled} onClick={handleClickReady}>
          {buttonReadyLabel}
        </button>
      )}

      {level === 9 && <button></button>}

      {level > 9 && (
        <button className={buttonResetDisabled} onClick={handleClickReset}>
          Play Again
        </button>
      )}
    </div>
  )
}

export default BigButton
