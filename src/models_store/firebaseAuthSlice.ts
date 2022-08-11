import { createSlice } from '@reduxjs/toolkit';

const authState = {
  isLoading: false,
  isInitialized: false,
  isAuthenticated: false,
  count: 0
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,

  reducers: {
    updateAuthState: (state, payload) => {
      state.isLoading = false;
      state.isInitialized = true;
      state.isAuthenticated = payload.payload !== null;
    }
  }
});

export const { updateAuthState } = authSlice.actions;

export default authSlice.reducer;
