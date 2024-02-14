import { Quiz } from '@/types/quiz-types'
import { createSlice } from '@reduxjs/toolkit'
import { Moment } from 'moment'

type State = {
  startAt: Moment | null
  endAt: Moment | null
  correctList: Array<Quiz>
  wrongList: Array<Quiz>
}

const initialState: State = {
  startAt: null,
  endAt: null,
  correctList: [],
  wrongList: [],
}

const answers = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    onStart(state, action) {
      state.startAt = action.payload
    },
    onEnd(state, action) {
      state.endAt = action.payload
    },
    onCorrect(state, action) {
      state.correctList.push(action.payload)
    },
    onWrong(state, action) {
      state.wrongList.push(action.payload)
    }
  }
})

export default answers.reducer

export const { onStart, onEnd, onCorrect, onWrong } = answers.actions