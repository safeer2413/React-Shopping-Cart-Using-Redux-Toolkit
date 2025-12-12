import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { filterReducer } from "./filterSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cartState: cartReducer,
        filterState: filterReducer,
    }
})