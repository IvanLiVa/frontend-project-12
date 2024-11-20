/* eslint-disable functional/no-expression-statement, no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
  },
});

export const { setChannels, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
