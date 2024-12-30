import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import GameProvider from "./contexts/GameContext.tsx"
import ScenesProvider from "./contexts/ScenesContext.tsx"
import "./index.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ScenesProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </ScenesProvider>
  </React.StrictMode>
)
