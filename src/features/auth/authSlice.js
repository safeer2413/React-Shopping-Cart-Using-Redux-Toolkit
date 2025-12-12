import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./AuthService";

// Login
export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            return await AuthService.login(email, password);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Signup
export const signupUser = createAsyncThunk(
    "auth/signup",
    async ({ name, email, password }, thunkAPI) => {
        try {
            return await AuthService.signup(name, email, password);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const token = localStorage.getItem("token");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: token || null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Signup
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;