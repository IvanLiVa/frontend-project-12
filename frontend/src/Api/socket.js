import { io } from 'socket.io-client';

class SocketApi {
  constructor() {
    this.socket = null;
  }

  createConnection() {
    this.socket = io();

    this.socket.on('connect', () => {
      console.log('Connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected');
    });
  }
  onNewMessage(dispatch, addMessageAction) {
    this.socket.on('newMessage', (message) => {
      dispatch(addMessageAction(message));
    });
  }

  onNewChannel(dispatch, addChannelAction) {
    this.socket.on('newChannel', (channelName) => {
      dispatch(addChannelAction(channelName));
    });
  }
  onRenameChannel(dispatch, renameChannelAction) {
    this.socket.on('renameChannel', (payload) => {
      console.log(payload);
      dispatch(renameChannelAction(payload));
    });
  }
  
  onRemoveChannel(dispatch, removeChannel, removeMessagesByChannelId) {
    this.socket.on('removeChannel', (payload) => {
      const { id } = payload;
      dispatch(removeChannel(id));
      dispatch(removeMessagesByChannelId(id));
    });
  }
}
export default new SocketApi();
