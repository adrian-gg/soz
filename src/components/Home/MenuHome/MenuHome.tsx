import { useContext } from "react"
import { ScenesContext } from "../../../contexts/ScenesContext"
import styles from "./MenuHome.module.scss"

function MenuHome() {
  const { scenesManager } = useContext(ScenesContext)

  const handleClickPlay = () => {
    scenesManager(
      { name: "home", state: false, transition: "zoom_in" },
      { name: "game", state: true, transition: "show_zoom" }
    )
  }

  const handleClickTutorial = () => {
    scenesManager(
      { name: "home", state: false, transition: "zoom_in" },
      { name: "tutorial", state: true, transition: "show_zoom" }
    )
  }

  /* const handleClickSettings = () => {
    scenesManager(
      { name: "home", state: false, transition: "zoom_in" },
      { name: "settings", state: true, transition: "show_zoom" }
    )
  } */

  const handleClickQuit = () => {
    window.close()
  }

  return (
    <ul className={styles.menu}>
      <li className={styles.option}>
        <button onClick={handleClickPlay}>Play</button>
      </li>

      <li className={styles.option}>
        <button onClick={handleClickTutorial}>How to play</button>
      </li>

      {/* <li className={styles.option}>
          <button onClick={handleClickSettings}>Settings</button>
        </li> */}

      <li className={styles.option}>
        <button onClick={handleClickQuit}>Quit</button>
      </li>
    </ul>
  )
}

export default MenuHome
