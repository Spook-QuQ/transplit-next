import { configureStore } from '@reduxjs/toolkit'
import translate from './modules/translate'

const store = configureStore({
  reducer: {
    translate,
  },
})

export default store
