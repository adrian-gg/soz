import { useContext } from "react"
import { GameContext } from "../../../contexts/GameContext"
import { classNames } from "../../../utils/classNames"
import Pawn from "../Pawn/Pawn"
import styles from "./PawnSpawner.module.scss"

function PawnSpawner() {
  const {
    game: { turn, level },
    turnPlayed,
  } = useContext(GameContext)

  const spawnerContainerClass = classNames(
    styles["spawner-container"],
    level === 0 && styles["spawner-mode--dice"],
    level > 0 && level <= 8 && styles["spawner-mode--play"],
    turn.player && styles[`player-${turn.player}`],
    turn.playing && styles[`playing-${turn.playing}`]
  )

  return (
    <div className={spawnerContainerClass}>
      <div className={styles.spawner}>
        <div className={styles["pawn-container"]}>
          {!turnPlayed && <Pawn value={level} player={null} />}
        </div>
      </div>
    </div>
  )
}

export default PawnSpawner
