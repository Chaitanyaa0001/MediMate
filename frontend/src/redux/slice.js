import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  role: null,
  token: null,
  isAuthenticated: false,
  isAuthLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
        state.isAuthLoading = false;
    },
    setAuthLoadingDone: (state) => {
      state.isAuthLoading = false; // ⬅️ manually done if unauthenticated
    }
  },
});

export const { setAuth, clearAuth,setAuthLoadingDone } = authSlice.actions;
export default authSlice.reducer;
