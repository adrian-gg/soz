//import FrameStyle from './Frame.module.css'
import { ReactNode } from "react"
import styles from "./Frame.module.scss"

interface FrameProps {
  children: ReactNode
}
function Frame({ children }: FrameProps) {
  return (
    <div className={styles.frame}>
      <div className={styles["frame-box"]}>{children}</div>
    </div>
  )
}

export default Frame
