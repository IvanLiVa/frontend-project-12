import { addMessageApi } from '../../Api/messages.js';
import { addMessage } from '../slices/messagesSlice.js';

const sendMessage =
  (messageText, channelId, username, token) => async (dispatch) => {
    const message = {
      body: messageText,
      channelId,
      username,
    };

    try {
      const newMessage = await addMessageApi(message, token);
      dispatch(addMessage(newMessage));
    } catch (error) {
      console.error('Ошибка добавления сообщения:', error.message);
    }
  };

export default sendMessage;
