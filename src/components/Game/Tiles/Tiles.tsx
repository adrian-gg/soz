//import TilesStyle from './Tiles.module.css'
import { useContext } from "react"
import { GameContext } from "../../../contexts/GameContext"
import { TIMER_LENGTH } from "../../../data/consts"
import { type TileType } from "../../../hooks/useGame"
import { classNames } from "../../../utils/classNames"
import Pawn from "../Pawn/Pawn"
import styles from "./Tiles.module.scss"

function Tiles() {
  const {
    game: { level, turn, board, timer },
    resettingGame,
    updateBoard,
    setTurnPlayed,
  } = useContext(GameContext)

  const tilesClass = classNames(styles.tiles, resettingGame && styles.resetting)

  const isButtonAvailable =
    timer.time >= 1 &&
    timer.time <= TIMER_LENGTH &&
    level > 0 &&
    level <= 8 &&
    turn.player === turn.playing

  const handleClickTile = (tile: TileType) => {
    setTurnPlayed(true)
    updateBoard(tile)
  }

  return (
    <>
      <div className={tilesClass}>
        {board.map((tile) => {
          const { id, pawn, player } = tile
          const classTile = classNames(
            styles["tile-container"],
            styles[`tile-${id}`],
            id <= 7 ? styles["tile-out"] : styles["tile-in"]
          )

          return (
            <div key={`tile-${id}`} className={classTile}>
              {pawn !== null && player ? (
                <div className={styles.tile}>
                  <Pawn value={pawn} player={player} />
                </div>
              ) : (
                isButtonAvailable && (
                  <button
                    className={classNames(
                      styles.tile,
                      styles["tile--available"]
                    )}
                    onClick={() => handleClickTile(tile)}></button>
                )
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Tiles
