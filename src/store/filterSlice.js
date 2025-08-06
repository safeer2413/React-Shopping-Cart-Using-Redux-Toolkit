import { createSlice } from "@reduxjs/toolkit";

const filterSlices = createSlice({
    name: "filter",
    initialState: {
        filterShow: false,
        sort: "",
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    },

    reducers: {
        filterToggle(state) {
            state.filterShow = !state.filterShow;
        },

        sortByPrice: (state, action) => {
            state.sort = action.payload;
        },

        filterStock: (state) => {
            state.byStock = !state.byStock;
        },

        filterFastDelivery: (state) => {
            state.byFastDelivery = !state.byFastDelivery;
        },

        filterRating(state, action) {
            state.byRating = action.payload;
        },

        clearFilters(state) {
            state.sort = "";
            state.byStock = false;
            state.byFastDelivery = false;
            state.byRating = 0;
        },

        filterBySearch: (state, action) => {
            state.searchQuery = action.payload;
        },

    }
})
export const {
    filterToggle,
    sortByPrice,
    filterStock,
    filterFastDelivery,
    filterRating,
    clearFilters,
    filterBySearch,

} = filterSlices.actions;
export const filterReducer = filterSlices.reducer;