import { configureStore } from '@reduxjs/toolkit'
import a from '../features/cartSlice'

export default configureStore({
  reducer: {
    cart: a,
  },
})