import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlices = createSlice({
    name: "cart",
    initialState: {
        cartList: JSON.parse(localStorage.getItem("cartList")) || [],
        total: JSON.parse(localStorage.getItem("total")) || 0,
        gotoCart: false,
    },

    reducers: {
        addCart(state, action) {
            const updatedCart = state.cartList.concat({
                ...action.payload,
                qty: 1,
            });
            const totalPrice = state.total + Number(action.payload.price);
            toast.success(`${action.payload.name} Added to cart`);

            localStorage.setItem("cartList", JSON.stringify(updatedCart));
            localStorage.setItem("total", JSON.stringify(totalPrice));

            return { ...state, cartList: updatedCart, total: totalPrice };
        },

        removeCart(state, action) {
            const updatedCart = state.cartList.filter(
                (item) => item.id !== action.payload.id
            );
            const totalPrice =
                state.total - Number(action.payload.price) * (action.payload.qty || 1);
            toast.error(`${action.payload.name} Removed from cart`);

            localStorage.setItem("cartList", JSON.stringify(updatedCart));
            localStorage.setItem("total", JSON.stringify(totalPrice));

            return { ...state, cartList: updatedCart, total: totalPrice };
        },

        // UPDATED addPrice
        addPrice(state, action) {
            const { id, qty } = action.payload;

            const updatedCart = state.cartList.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        qty: Number(qty) || 1,
                    };
                }
                return item;
            });

            const newTotal = updatedCart.reduce((acc, item) => {
                const price = Number(item.price) || 0;
                const quantity = Number(item.qty) || 1;
                return acc + price * quantity;
            }, 0);

            localStorage.setItem("cartList", JSON.stringify(updatedCart));
            localStorage.setItem("total", JSON.stringify(newTotal));

            return {
                ...state,
                cartList: updatedCart,
                total: newTotal,
            };
        },
    },
});

export const { addCart, removeCart, addPrice } = cartSlices.actions;
export const cartReducer = cartSlices.reducer;
