import { configureStore } from '@reduxjs/toolkit'
import result from './modules/result'

const store = configureStore({
  reducer: {
    result,
  },
})

export default store
