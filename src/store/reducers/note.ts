import { Note, Quiz } from '@/types/quiz-types'
import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { Moment } from 'moment'

type State = {
  noteList: Array<Note>
}

const initialState: State = {
  noteList: []
}

const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote(state, action) {
      state.noteList.push({
        recordAt: moment(),
        wrongList: action.payload
      })
    },
  }
})

export default note.reducer

export const { addNote } = note.actions