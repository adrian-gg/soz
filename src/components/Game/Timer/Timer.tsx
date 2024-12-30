//import TimerStyle from './Timer.module.css'
import { CSSProperties, useContext } from "react"
import { GameContext } from "../../../contexts/GameContext"
import { TIMER_LENGTH } from "../../../data/consts"
import { classNames } from "../../../utils/classNames"
import styles from "./Timer.module.scss"

function Timer() {
  const {
    game: { timer },
  } = useContext(GameContext)

  const percent = (timer.time * 360) / TIMER_LENGTH
  const timerClass = classNames(
    styles.timer,
    percent === 0 && styles["percent-0"]
  )
  const timerStyle = { "--percent": percent } as CSSProperties

  return (
    <div className={timerClass} style={timerStyle}>
      <div className={styles.circle}></div>
    </div>
  )
}

export default Timer
