import { CSSProperties, ReactNode } from "react"
import { TRANSITIONS, type TransitionsType } from "../../../data/consts"
import { classNames } from "../../../utils/classNames"
import styles from "./TransitionBlock.module.scss"

interface TransitionBlockProps {
  type: keyof TransitionsType | null
  children: ReactNode
}
function TransitionBlock({ type, children }: TransitionBlockProps) {
  const transitionClass = classNames(
    styles.transition,
    type && styles[`transition-${type}`]
  )

  const transitionStyle = {
    "--transition-duration":
      type && TRANSITIONS[type]
        ? `${TRANSITIONS[type].duration / 1000}s`
        : "0s",
  } as CSSProperties

  return (
    <div className={transitionClass} style={transitionStyle}>
      {children}
    </div>
  )
}

export default TransitionBlock
