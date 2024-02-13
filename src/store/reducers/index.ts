import { combineReducers } from "@reduxjs/toolkit"

import answers from "./answers"

const reducers = combineReducers({
  answers
})

export type AppState = ReturnType<typeof reducers>

export default reducers
