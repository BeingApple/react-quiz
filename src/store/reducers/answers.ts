import { Quiz } from '@/types/quiz-types'
import { createSlice } from '@reduxjs/toolkit'
import { Moment } from 'moment'

type State = {
  index: number
  startAt: Moment | null
  endAt: Moment | null
  correctList: Array<Quiz>
  wrongList: Array<Quiz>
}

const initialState: State = {
  index: 0,
  startAt: null,
  endAt: null,
  correctList: [],
  wrongList: [],
}

const answers = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setStartAt(state, action) {
      state.startAt = action.payload
    },
    setEndAt(state, action) {
      state.endAt = action.payload
    },
    onCorrect(state, action) {
      state.correctList.push(action.payload)
    },
    onWrong(state, action) {
      state.wrongList.push(action.payload)
    },
    resetList(state) {
      state.wrongList = []
      state.correctList = []
    },
    addIndex(state) {
      state.index += 1
    },
    resetIndex(state) {
      state.index = 0
    }
  }
})

export default answers.reducer

export const { setStartAt, setEndAt, onCorrect, onWrong, resetList, addIndex, resetIndex } = answers.actions