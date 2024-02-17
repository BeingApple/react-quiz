import { combineReducers } from "@reduxjs/toolkit"

import answers from "./answers"
import playing from "./playing"
import note from "./note"
import snackbar from "./snackbar"

const reducers = combineReducers({
  answers,
  playing,
  note,
  snackbar
})

export type AppState = ReturnType<typeof reducers>

export default reducers
