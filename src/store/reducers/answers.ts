import { createSlice } from '@reduxjs/toolkit'
import { Moment } from 'moment'

type State = {
  startAt: Moment | null
  endAt: Moment | null
  correctCount: number
  wrongCount: number
  index: number
}

const initialState: State = {
  startAt: null,
  endAt: null,
  correctCount: 0,
  wrongCount: 0,
  index: 0,
}

const answers = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    onStart(state, action) {
      state.startAt = action.payload.startAt
    },
    onEnd(state, action) {
      state.endAt = action.payload.endAt
    },
    onCorrect(state) {
      state.correctCount += 1
    },
    onWrong(state) {
      state.wrongCount += 1
    },
    addIndex(state) {
      state.index += 1
    }
  }
})

export default answers.reducer

export const { onStart, onEnd, onCorrect, onWrong, addIndex } = answers.actions