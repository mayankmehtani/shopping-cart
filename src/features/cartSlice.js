import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const cartSlice = createSlice({
    name: 'cart', // not entirely sure what this field does
    initialState: {
        total: 0,
        items: {}
    },
    reducers: {
        addItemToCart: (state=this.initialState, action) => {
            let newItems = Object.assign({}, state.items);
            newItems[action.payload.itemName] = {
                "price": action.payload.price,
                "quantity": _.get(newItems[action.payload.itemName], "quantity", 0) + action.payload.quantity,
            }

            return {
                items: newItems,
                total: state.total+(action.payload.price*action.payload.quantity)
            };
        },
        clearCart: (state=this.initialState, action) => {
            return {
                total: 0,
                items: {}
            };
        }
    }
})

export const {addItemToCart, clearCart} = cartSlice.actions

export default cartSlice.reducer;