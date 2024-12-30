import pawns from "../../../assets/pawns.svg"
import { classNames } from "../../../utils/classNames"
import styles from "./Pawn.module.scss"

interface PawnProps {
  value: number
  player?: "P1" | "P2" | null
}
function Pawn({ value, player }: PawnProps) {
  const pawnClass = classNames(styles.pawn, player && styles[player])

  return (
    <div className={pawnClass}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <use href={`${pawns}#pawn-${value}`} />
      </svg>
    </div>
  )
}

export default Pawn
