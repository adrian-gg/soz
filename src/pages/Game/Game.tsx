import { useContext } from "react"
import board from "../../assets/board.svg"
import rails from "../../assets/rails.svg"
import {
  BigButton,
  Drawers,
  PawnSpawner,
  Spotlights,
  Tiles,
  Timer,
} from "../../components/Game"
import { Frame, TransitionBlock } from "../../components/layout"
import { GameContext } from "../../contexts/GameContext"
import { ScenesContext } from "../../contexts/ScenesContext"
import { classNames } from "../../utils/classNames"
import styles from "./Game.module.scss"

function Game() {
  const {
    scenes: { game },
    scenesManager,
  } = useContext(ScenesContext)
  const {
    game: { turn, results, level },
    resettingGame,
  } = useContext(GameContext)

  /* -- ClassNames -- */
  const gameClass = classNames(
    styles.page,
    turn.player && styles[`player-${turn.player}`],
    turn.playing && styles[`playing-${turn.playing}`],
    resettingGame && styles.resetting
  )
  const railsClass = classNames(
    styles.rails,
    results.winner !== null && styles["rails-result"]
  )

  const isButtonBackReady = (level === 0 || level > 9) && turn.player === null

  const handleClickBack = () => {
    scenesManager(
      { name: "game", state: false, transition: "hide_zoom" },
      { name: "home", state: true, transition: "zoom_out" }
    )
  }

  return (
    <TransitionBlock type={game.transition}>
      <div id={styles.Game} className={gameClass}>
        <Frame>
          <div className={railsClass}>
            <img src={rails} alt="rails" />
            <PawnSpawner />
          </div>

          <Drawers />

          <div className={styles["grids-container"]}>
            <div className={classNames(styles.grid, styles["grid-top"])}></div>
            <div className={classNames(styles.grid, styles["grid-bot"])}></div>
            <div className={classNames(styles.grid, styles["grid-left"])}></div>
            <div
              className={classNames(styles.grid, styles["grid-right"])}></div>
          </div>

          <div className={styles["board-container"]}>
            <Spotlights />

            <div className={styles.board}>
              <img src={board} alt="board" />
              <Tiles />
            </div>
          </div>

          <Timer />

          <BigButton />

          {isButtonBackReady && (
            <button
              className={classNames(styles.button, styles["button-back"])}
              onClick={handleClickBack}>
              Back
            </button>
          )}
        </Frame>
      </div>
    </TransitionBlock>
  )
}

export default Game
