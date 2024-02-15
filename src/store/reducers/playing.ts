import { PlayingStatus, Quiz } from '@/types/quiz-types'
import { createSlice } from '@reduxjs/toolkit'
import { Moment } from 'moment'

type State = {
  status: PlayingStatus
  startAt: Moment | null
  endAt: Moment | null
  index: number
}

const initialState: State = {
  status: 'not-start',
  startAt: null,
  endAt: null,
  index: 0,
}

const playing = createSlice({
  name: 'playing',
  initialState,
  reducers: {
    setStartAt(state, action) {
      state.startAt = action.payload
    },
    setEndAt(state, action) {
      state.endAt = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    addIndex(state) {
      state.index += 1
    },
    resetIndex(state) {
      state.index = 0
    }
  }
})

export default playing.reducer

export const { setStartAt, setEndAt, setStatus, addIndex, resetIndex} = playing.actions