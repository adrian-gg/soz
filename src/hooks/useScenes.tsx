import { useReducer } from "react"
import { TRANSITIONS, type TransitionsType } from "../data/consts"

export type ScenesType = {
  [K in keyof typeof defaultScenesValue]: {
    state: boolean
    transition: keyof TransitionsType | null
  }
}

export const defaultScenesValue = {
  home: { state: true, transition: "show" },
  game: { state: false, transition: null },
  tutorial: { state: false, transition: null },
  settings: { state: false, transition: null },
}

function reducer(
  state: ScenesType,
  action: {
    type: keyof ScenesType | "reset"
    payload?: { state: boolean; transition: keyof TransitionsType | null }
  }
) {
  const { type, payload } = action

  if (type === "reset") {
    return { ...(defaultScenesValue as ScenesType) }
  } else {
    return { ...state, [type]: payload }
  }
}

function useScenes() {
  const [scenes, dispatch] = useReducer(
    reducer,
    defaultScenesValue as ScenesType
  )

  const scenesManager = (
    ...sceneses: {
      name: keyof ScenesType
      state: boolean
      transition: keyof TransitionsType
    }[]
  ) => {
    sceneses.forEach(({ name, state, transition }) => {
      if (state) {
        dispatch({ type: name, payload: { state, transition } })
      } else {
        dispatch({ type: name, payload: { ...scenes[name], transition } })
        setTimeout(() => {
          dispatch({ type: name, payload: { state, transition } })
        }, TRANSITIONS[transition].duration)
      }
    })
  }

  const resetScenes = () => {
    dispatch({ type: "reset" })
  }

  return {
    scenes,
    scenesManager,
    resetScenes,
  }
}

export default useScenes
