import { useContext } from "react"
import { Frame, TransitionBlock } from "../../components/layout"
import { Slider } from "../../components/Tutorial"
import { ScenesContext } from "../../contexts/ScenesContext"
import { classNames } from "../../utils/classNames"
import styles from "./Tutorial.module.scss"

function Tutorial() {
  const {
    scenes: { tutorial },
    scenesManager,
  } = useContext(ScenesContext)

  const handleClickBack = () => {
    scenesManager(
      { name: "tutorial", state: false, transition: "hide_zoom" },
      { name: "home", state: true, transition: "zoom_out" }
    )
  }

  return (
    <TransitionBlock type={tutorial.transition}>
      <div id="Tutorial" className={classNames("page", styles.tutorial)}>
        <Frame>
          <div className={styles["grid"]}></div>

          <div className={styles["slider-container"]}>
            <Slider />
          </div>

          <button
            className={classNames(styles["button"], styles["button-back"])}
            onClick={handleClickBack}>
            Back
          </button>
        </Frame>
      </div>
    </TransitionBlock>
  )
}

export default Tutorial
