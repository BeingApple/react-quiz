import { createSlice } from '@reduxjs/toolkit'

type State = {
  open: boolean
  message?: string
  onClose?: () => void
}

const initialState: State = {
  open: false
}

const snackbar = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(state, action) {
      state.onClose = action.payload.onClose
      state.message = action.payload.message
      state.open = true
    },
    hideSnackbar(state) {
      state.onClose = undefined
      state.message = undefined
      state.open = false
    },
  }
})

export default snackbar.reducer

export const { showSnackbar, hideSnackbar } = snackbar.actions