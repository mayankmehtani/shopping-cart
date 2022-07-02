import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart', // not entirely sure what this field does
    initialState: {
        total: 55,
        items: {}
    },
    reducers: {
        a: (state) => {
            return state;
        }
    }
})

export default cartSlice.reducer;