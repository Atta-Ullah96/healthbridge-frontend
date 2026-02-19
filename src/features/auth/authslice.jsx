import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,        // { id, name, email, role }
  role: null,        // 'admin' | 'doctor' | 'patient' | 'labOwner'
  isAuthenticated: false,
  loading: true,     // useful when checking session on app 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
      state.loading = false;
    },

    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCredentials,
  logout,
  setAuthLoading,
} = authSlice.actions;

export default authSlice.reducer;
