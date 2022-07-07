import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart', // not entirely sure what this field does
    initialState: {
        total: 0,
        items: {}
    },
    reducers: {
        addItemToCart: (state=this.initialState, action) => {
            return {
                ...state,
                total: state.total+(action.payload.price*action.payload.quantity)
            };
        }
    }
})

export const {addItemToCart} = cartSlice.actions

export default cartSlice.reducer;