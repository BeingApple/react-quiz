import { combineReducers } from "@reduxjs/toolkit"

import answers from "./answers"
import playing from "./playing"

const reducers = combineReducers({
  answers,
  playing
})

export type AppState = ReturnType<typeof reducers>

export default reducers
