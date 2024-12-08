/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessagesByChannelId: (state, action) => {
      const channelId = action.payload;
      state.messages = state.messages.filter(
        (message) => message.channelId !== channelId
      );
    },
  },
});

export const { setMessages, addMessage, removeMessagesByChannelId } =
  messagesSlice.actions;

export default messagesSlice.reducer;
