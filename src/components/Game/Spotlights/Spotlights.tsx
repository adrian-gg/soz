import { useContext, useMemo } from "react"
import { GameContext } from "../../../contexts/GameContext"
import { classNames } from "../../../utils/classNames"
import styles from "./Spotlights.module.scss"

function Spotlights() {
  const {
    game: { results },
    resettingGame,
  } = useContext(GameContext)

  const { player1, player2, ties, winner } = results

  const spotlightsClass = classNames(
    styles.spotlights,
    resettingGame && styles.resetting
  )
  const spotlights = useMemo(() => {
    const spotlightClass = (type: string, payload?: number) =>
      classNames(
        styles.spotlight,
        type === "winner"
          ? styles[`spotlight-${type}-${winner}`]
          : styles[`spotlight-${payload}`],
        type !== "tie" && styles[`spotlight-${type}`]
      )

    return (
      <>
        {player1.blocks.map((block) => (
          <div
            key={`spotlight-P1-${block}`}
            className={spotlightClass("P1", block)}></div>
        ))}

        {player2.blocks.map((block) => (
          <div
            key={`spotlight-P2-${block}`}
            className={spotlightClass("P2", block)}></div>
        ))}

        {ties.map((block) => (
          <div
            key={`spotlight-tie-${block}`}
            className={spotlightClass("tie", block)}></div>
        ))}

        {winner && <div className={spotlightClass("winner")}></div>}
      </>
    )
  }, [player1.blocks, player2.blocks, ties, winner])

  return <div className={spotlightsClass}>{spotlights}</div>
}

export default Spotlights
