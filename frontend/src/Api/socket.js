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
      console.log('New message received:', message);
      dispatch(addMessageAction(message));
    });
  }
}
export default new SocketApi();
