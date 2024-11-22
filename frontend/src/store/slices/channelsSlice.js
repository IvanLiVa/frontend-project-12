/* eslint-disable functional/no-expression-statement, no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: '1',
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
    setActiveChannelId(state, action) {
      state.activeChannelId = action.payload;
    },
  },
});

export const { setChannels, addChannel, setActiveChannelId } =
  channelsSlice.actions;
export default channelsSlice.reducer;
