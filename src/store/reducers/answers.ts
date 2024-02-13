import { createSlice } from '@reduxjs/toolkit'
import { Moment } from 'moment'

type State = {
  startAt: Moment | null
  endAt: Moment | null
  correctCount: number
  wrongCount: number
}

const initialState: State = {
  startAt: null,
  endAt: null,
  correctCount: 0,
  wrongCount: 0,
}

const answers = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    start(state, action) {
      state.startAt = action.payload.startAt
    },
    end(state, action) {
      state.endAt = action.payload.endAt
    },
    correct(state) {
      state.correctCount += 1
    },
    wrong(state) {
      state.wrongCount += 1
    }
  }
})

export default answers.reducer

export const { start, end, correct, wrong } = answers.actions