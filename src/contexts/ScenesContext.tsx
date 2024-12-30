import { createContext, ReactNode } from "react"
import { TransitionsType } from "../data/consts"
import useScenes, {
  defaultScenesValue,
  type ScenesType,
} from "../hooks/useScenes"

interface ScenesContextProps {
  scenes: ScenesType
  scenesManager: (
    ...sceneses: {
      name: keyof ScenesType
      state: boolean
      transition: keyof TransitionsType
    }[]
  ) => void
  resetScenes: () => void
}

interface ScenesProviderProps {
  children: ReactNode
}

const defaultContextValues: ScenesContextProps = {
  scenes: defaultScenesValue as ScenesType,
  scenesManager: () => undefined,
  resetScenes: () => undefined,
}

export const ScenesContext =
  createContext<ScenesContextProps>(defaultContextValues)

function ScenesProvider({ children }: ScenesProviderProps) {
  const { scenes, scenesManager, resetScenes } = useScenes()

  return (
    <ScenesContext.Provider
      value={{
        scenes,
        scenesManager,
        resetScenes,
      }}>
      {children}
    </ScenesContext.Provider>
  )
}

export default ScenesProvider
