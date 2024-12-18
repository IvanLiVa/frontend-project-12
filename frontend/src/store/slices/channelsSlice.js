/* eslint-disable no-param-reassign */
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
      const newChannel = action.payload;
      state.channels.push(newChannel);
    },
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
    updateChannel: (state, action) => {
      const { id, name } = action.payload;
      const foundChannel = state.channels.find((ch) => ch.id === id);
      if (foundChannel) {
        foundChannel.name = name;
      }
    },
    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channels = state.channels.filter(
        (channel) => channel.id !== channelId,
      );

      if (state.activeChannelId === channelId) {
        state.activeChannelId = '1';
      }
    },
  },
});

export const {
  setChannels, addChannel, setActiveChannelId, updateChannel, removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
