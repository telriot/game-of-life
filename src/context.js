import React, { useReducer, createContext, useEffect } from "react"
import { createEmptyBoardTwoValues, evaluateCellsTwoValues } from "./helpers"
import TYPES from "./types"

const HEIGHT = 30
const WIDTH = 50
const INTERVAL_LENGTH = 100

const initialState = {
  board: createEmptyBoardTwoValues(HEIGHT, WIDTH),
  tick: 0,
  isRunning: false,
  interval: undefined,
}
export const AppContext = createContext(initialState)

const AppContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.TICK:
        return {
          ...state,
          tick: state.tick++,
        }

      case TYPES.TOGGLE_IS_RUNNING:
        return {
          ...state,
          isRunning: state.isRunning ? false : true,
        }
      case TYPES.UPDATE_BOARD:
        return {
          ...state,
          board: action.board,
        }
      case TYPES.SET_INTERVAL:
        return {
          ...state,
          interval: action.interval,
        }
      case TYPES.CLEAR_BOARD:
        return {
          board: createEmptyBoardTwoValues(HEIGHT, WIDTH),
          tick: 0,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  const startGame = () => {
    dispatch({ type: "TOGGLE_IS_RUNNING" })
    const interval = setInterval(
      () => dispatch({ type: "TICK" }),
      INTERVAL_LENGTH
    )
    dispatch({ type: "SET_INTERVAL", interval })
  }

  const stopGame = () => {
    dispatch({ type: "TOGGLE_IS_RUNNING" })
    clearInterval(state.interval)
    dispatch({ type: "SET_INTERVAL", interval: initialState.interval })
  }

  useEffect(() => {
    const newBoard = evaluateCellsTwoValues(state.board, HEIGHT, WIDTH)
    dispatch({
      type: "UPDATE_BOARD",
      board: newBoard,
    })
  }, [state.tick])

  return (
    <AppContext.Provider
      value={{ state, dispatch, startGame, stopGame, HEIGHT, WIDTH }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
