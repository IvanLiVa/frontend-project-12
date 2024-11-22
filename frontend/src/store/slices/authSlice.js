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
    setUser(state, action) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
