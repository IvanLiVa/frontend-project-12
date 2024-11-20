/* eslint-disable functional/no-expression-statement, no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action) {
      console.log('Reducer received payload:', action.payload);
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
    clearAuthData(state) {
      state.token = null;
      state.username = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
