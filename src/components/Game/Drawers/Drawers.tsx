import { useContext } from "react"
import { GameContext } from "../../../contexts/GameContext"
import { classNames } from "../../../utils/classNames"
import NumberIcon from "../NumberIcon/NumberIcon"
import styles from "./Drawers.module.scss"

function Drawers() {
  const {
    game: { results },
    resettingGame,
  } = useContext(GameContext)

  const drawersClass = classNames(
    styles.drawers,
    results.winner !== null && styles["drawers-result"],
    resettingGame && styles.resetting
  )

  return (
    <div className={drawersClass}>
      <div
        className={classNames(
          styles.drawer,
          styles["drawer-top"],
          results.winner === "P2" && styles["drawer-P2"]
        )}>
        {results.player2.total && <NumberIcon value={results.player2.total} />}
      </div>
      <div
        className={classNames(
          styles.drawer,
          styles["drawer-bot"],
          results.winner === "P1" && styles["drawer-P1"]
        )}>
        {results.player1.total && <NumberIcon value={results.player1.total} />}
      </div>
    </div>
  )
}

export default Drawers
