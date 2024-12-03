/* eslint-disable functional/no-expression-statement, no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: '1',
  createdByUser: null, 
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
      if (state.createdByUser === newChannel.createdBy) {
        state.activeChannelId = newChannel.id;
      }
    },
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },

    updateChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((channel) => channel.id === id);
      if (channel) {
        channel.name = name;
      }
    },
    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channels = state.channels.filter(
        (channel) => channel.id !== channelId
      );

      if (state.activeChannelId === channelId) {
        state.activeChannelId = state.channels.length > 0 ? state.channels[0].id : '1';
      }
    },
    setCreatedByUser: (state, action) => {
      state.createdByUser = action.payload;
    },
  },
});

export const {
  setChannels,
  addChannel,
  setActiveChannelId,
  updateChannel,
  removeChannel,
  setCreatedByUser,
} = channelsSlice.actions;

export default channelsSlice.reducer;
