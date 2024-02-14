import { Quiz } from '@/types/quiz-types'
import { createSlice } from '@reduxjs/toolkit'
import { Moment } from 'moment'

type State = {
  startAt: Moment | null
  endAt: Moment | null
  correctList: Array<Quiz>
  wrongList: Array<Quiz>
  index: number
}

const initialState: State = {
  startAt: null,
  endAt: null,
  correctList: [],
  wrongList: [],
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
    onCorrect(state, action) {
      state.correctList.push(action.payload)
    },
    onWrong(state, action) {
      state.wrongList.push(action.payload)
    },
    addIndex(state) {
      state.index += 1
    }
  }
})

export default answers.reducer

export const { onStart, onEnd, onCorrect, onWrong, addIndex } = answers.actions