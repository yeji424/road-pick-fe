import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    // authSlice 연결
    auth: authReducer,
  },
})

export default store
