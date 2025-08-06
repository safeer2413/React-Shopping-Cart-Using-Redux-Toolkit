import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const cartSlices = createSlice({
    name: "cart",
    initialState: {
        cartList: [],
        total: 0,
        gotoCart: false,
    },

    reducers: {
        addCart(state, action) {
            const updatedCart = state.cartList.concat(action.payload)
            const totalPrice = state.total + action.payload.price
            toast.success(`${action.payload.name} Added to cart`);
            return { ...state, cartList: updatedCart, total: totalPrice }
        },

        removeCart(state, action) {
            const updatedCart = state.cartList.filter(current => current.id !== action.payload.id)
            const totalPrice = state.total - action.payload.price
            toast.error(`${action.payload.name} Removed from cart`);
            return { ...state, cartList: updatedCart, total: totalPrice }
        },

        // addPrice(state, action) {
        //     const totalPrice = state.total + action.payload.price * action.payload.qty
        //     return { ...state, total: totalPrice }
        // }

        addPrice(state, action) {
            const { id, qty } = action.payload;

            // Update the qty in cartList
            const updatedCart = state.cartList.map((item) =>
                item.id === id ? { ...item, qty: Number(qty) } : item
            );

            // Recalculate total
            const newTotal = updatedCart.reduce(
                (acc, item) => acc + item.price * item.qty,
                0
            );

            return {
                ...state,
                cartList: updatedCart,
                total: newTotal,
            };
        }

    }
})

export const { addCart, removeCart, addPrice } = cartSlices.actions;
export const cartReducer = cartSlices.reducer;