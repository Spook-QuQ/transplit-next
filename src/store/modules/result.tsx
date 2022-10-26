import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { create } from 'domain'

export type InitialStateProps = {
  result: any[]
  isRequesting: boolean
  status: string
  langs: string[]
  currentLang: 'ja'
}

const initialState: InitialStateProps = {
  result: [],
  isRequesting: false,
  status: '',
  langs: ['ja', 'en'],
  currentLang: 'ja'
}

const requestTranslate = createAsyncThunk('result/request', async () => {
  // 非同期処理
  return await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
})

// ここでは純粋関数でなくても良い
const result = createSlice({
  name: 'result',
  initialState,
  reducers: {
    set(state, { type, payload }) {
      console.log(type)
      if (Array.isArray(payload)) state.result = payload
    },
    deleteInput(state, { type /*, payload */ }) {
      state.result = []
    },
    toggleIsRequesting(state) {
      state.isRequesting != state.isRequesting
    },
  },
  extraReducers(builder) {
    builder
      .addCase(requestTranslate.pending, (state) => {
        state.isRequesting = true
        state.status = 'Requesting'
      })
      .addCase(requestTranslate.fulfilled, (state /* action */) => {
        // const { payload } = action
        state.status = ''
        state.isRequesting = false
      })
      .addCase(requestTranslate.rejected, (state) => {
        state.status = 'Error'
      })
  },
})

const { set, deleteInput, toggleIsRequesting } = result.actions

export { set, deleteInput, toggleIsRequesting, requestTranslate }
export default result.reducer
