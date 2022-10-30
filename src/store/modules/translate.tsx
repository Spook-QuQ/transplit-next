import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  PostForTranslate,
  // WordResult,
  // ParsedWord,
  TranslateResult,
} from '@/types/translateAPI'

export type InitialStateType = {
  result: TranslateResult
  isRequesting: boolean
  status: string
  langs: {
    code: string
    name: string
  }[]
  currentLangPair: {
    source: string
    target: string
  }
}

const initialState: InitialStateType = {
  result: {
    source: [],
    target: [],
  },
  isRequesting: false,
  status: '',
  langs: [
    {
      code: 'ja',
      name: 'Japanese',
    },
    {
      code: 'en',
      name: 'English',
    },
  ],
  currentLangPair: { source: 'ja', target: 'en' },
}

const requestTranslate = createAsyncThunk<
  // Return type of the payload creator
  TranslateResult,
  // First argument to the payload creator
  // 補足：このコードで言う "inputValue" の型について言っている↓
  // dispatch(resultModule.requestTranslate(inputValue))>
  string,
  {
    // Optional fields for defining thunkApi field types
    // dispatch: ~
    state: { translate: InitialStateType }
    // extra: {
    //   jwt: string
    // }
  }
>(
  'result/request',
  // payloadCreator
  async (inputValue /* ← arg */, ThunkAPI) => {
    const state = ThunkAPI.getState()

    const { source, target } = state.translate.currentLangPair

    const body: PostForTranslate = {
      text: inputValue,
      language: {
        source,
        target,
      },
    }

    const res = await fetch('/api/translate', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.status !== 200) throw new Error('Error: ' + res.status)

    return (await res.json()) as TranslateResult
  },
)

// ここでは純粋関数でなくても良い
const result = createSlice({
  name: 'result',
  initialState,
  reducers: {
    // set(state, { /* type, */ payload }) {
    //   if (typeof payload === 'object' && payload.target && payload.source) {
    //     state.result = payload
    //   }
    // },
    deleteInput(
      state,
      /* { type, payload },*/
    ) {
      state.result.source = []
      state.result.target = []
    },
    toggleIsRequesting(state) {
      state.isRequesting != state.isRequesting
    },
    switchPair(state) {
      const source = state.currentLangPair.source
      const target = state.currentLangPair.target
      state.currentLangPair.source = target
      state.currentLangPair.target = source
    },
  },
  extraReducers(builder) {
    builder
      .addCase(requestTranslate.pending, (state) => {
        state.isRequesting = true
        // state.status = 'Requesting'
        state.status = 'Translating'
      })
      .addCase(requestTranslate.fulfilled, (state, action) => {
        const { payload } = action
        state.result = payload
        state.status = ''
        state.isRequesting = false
      })
      .addCase(requestTranslate.rejected, (state) => {
        state.status = 'Error'
      })
  },
})

const { /* set, */ deleteInput, toggleIsRequesting, switchPair } =
  result.actions

export {
  /* set, */ deleteInput,
  toggleIsRequesting,
  requestTranslate,
  switchPair,
}
export default result.reducer
