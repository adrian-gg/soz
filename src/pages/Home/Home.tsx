import { useContext } from "react"
import logo from "../../assets/logo.svg"
import { MenuHome } from "../../components/Home"
import { Frame, TransitionBlock } from "../../components/layout"
import { ScenesContext } from "../../contexts/ScenesContext"
import styles from "./Home.module.scss"

function Home() {
  const {
    scenes: { home },
  } = useContext(ScenesContext)

  return (
    <TransitionBlock type={home.transition}>
      <div id={styles.Home} className="page">
        <Frame>
          <div className={styles.hole}></div>

          <div className={styles.grid}></div>

          <div className={styles.logo}>
            <img src={logo} alt="Logo of SOZ" />
          </div>

          <MenuHome />
        </Frame>
      </div>
    </TransitionBlock>
  )
}

export default Home
