import { Quiz } from '@/types/quiz-types'
import { createSlice } from '@reduxjs/toolkit'
import { Moment } from 'moment'

type State = {
  correctList: Array<Quiz>
  wrongList: Array<Quiz>
}

const initialState: State = {
  correctList: [],
  wrongList: [],
}

const answers = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    onCorrect(state, action) {
      state.correctList.push(action.payload)
    },
    onWrong(state, action) {
      state.wrongList.push(action.payload)
    },
    resetList(state) {
      state.wrongList = []
      state.correctList = []
    }
  }
})

export default answers.reducer

export const { onCorrect, onWrong, resetList } = answers.actions